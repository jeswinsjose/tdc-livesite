
import { Resend } from 'resend';
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { encode } from "std/encoding/base64.ts";

async function createEstimatePdf(formData: any, estimate: any) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;
    let y = height - 50;

    page.drawText('Project Estimate Summary', { x: 50, y, font, size: 24, color: rgb(0, 0, 0) });
    y -= 40;

    const details = [
        { label: 'Project Name', value: formData.projectName || 'N/A' },
        { label: 'Service', value: formData.service || 'N/A' },
        { label: 'Address', value: formData.address || 'N/A' },
        { label: 'Space Size', value: `${formData.totalArea?.toLocaleString() ?? 0} ft²` },
        { label: 'Floors', value: formData.floors || 'N/A' },
        { label: 'Space Type', value: formData.spaceType || 'N/A' },
        { label: 'Scopes', value: formData.scopes?.join(", ") || 'N/A' },
        { label: 'Unit', value: formData.preferredUnit },
        { label: 'First Scan Date', value: formData.scanDate1 },
        { label: '---', value: '---' },
        { label: 'Estimated Price', value: `$${estimate.price?.toLocaleString() ?? 0}` },
        { label: 'Estimated Delivery', value: estimate.delivery },
    ];

    details.forEach(detail => {
        if (detail.label === '---') {
            y -= 10;
            return;
        }
        page.drawText(`${detail.label}: ${detail.value}`, { x: 50, y, font, size: fontSize });
        y -= 20;
    });

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
}

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const resend = new Resend(RESEND_API_KEY);
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { formData, estimate, user_email } = await req.json();

        const pdfBytes = await createEstimatePdf(formData, estimate);

        const { data, error } = await resend.emails.send({
            from: 'TDC Estimator <onboarding@resend.dev>',
            to: [user_email],
            subject: `Your Project Estimate: ${formData.projectName || 'New Project'}`,
            html: `
        <h1>Estimate Summary</h1>
        <p>Thank you for using the TDC Estimator. Your official estimate is attached to this email as a PDF.</p>
        <p>We will be in touch with you shortly.</p>
      `,
            attachments: [
                {
                    filename: `Estimate-${formData.projectName?.replace(/\s+/g, '_') || 'Project'}.pdf`,
                    content: encode(pdfBytes),
                },
            ],
        });

        if (error) throw error;

        return new Response(JSON.stringify({ data }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500,
        });
    }
})
