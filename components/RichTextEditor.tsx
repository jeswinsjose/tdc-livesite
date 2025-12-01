import React, { useRef, useEffect } from 'react';
import { 
  Bold, Italic, Underline, 
  Heading1, Heading2, Quote, 
  List, ListOrdered, Link as LinkIcon, Image as ImageIcon, 
  Code, AlignLeft, AlignCenter, AlignRight
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  className?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, className = '' }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  
  // Initialize content on mount and update when value changes externally
  useEffect(() => {
    if (editorRef.current) {
      // Only update if the new value is different from current DOM
      // and we are not currently editing (to avoid cursor jumps)
      if (editorRef.current.innerHTML !== value) {
        // If the editor is not focused, it's safe to update (e.g. initial load)
        if (document.activeElement !== editorRef.current) {
          editorRef.current.innerHTML = value;
        }
      }
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, arg?: string) => {
    document.execCommand(command, false, arg);
    // Ensure the editor keeps focus
    editorRef.current?.focus();
  };

  const addLink = () => {
    const url = prompt('Enter URL:');
    if (url) execCommand('createLink', url);
  };

  const addImage = () => {
    const url = prompt('Enter Image URL:');
    if (url) execCommand('insertImage', url);
  };

  const ToolbarButton = ({ 
    icon: Icon, 
    cmd, 
    arg, 
    onClick,
    title 
  }: { 
    icon: React.ElementType, 
    cmd?: string, 
    arg?: string, 
    onClick?: () => void,
    title?: string 
  }) => (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault(); // Prevent losing focus from editor
        if (onClick) onClick();
        else if (cmd) execCommand(cmd, arg);
      }}
      className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
      title={title}
    >
      <Icon size={16} />
    </button>
  );

  return (
    <div className={`flex flex-col border border-white/10 rounded-lg overflow-hidden bg-[#121212] ${className}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-white/10 bg-[#1A1A1A]">
        <div className="flex items-center gap-1 border-r border-white/10 pr-2 mr-1">
          <ToolbarButton icon={Bold} cmd="bold" title="Bold" />
          <ToolbarButton icon={Italic} cmd="italic" title="Italic" />
          <ToolbarButton icon={Underline} cmd="underline" title="Underline" />
        </div>
        
        <div className="flex items-center gap-1 border-r border-white/10 pr-2 mr-1">
          <ToolbarButton icon={Heading1} cmd="formatBlock" arg="H2" title="Heading 2" />
          <ToolbarButton icon={Heading2} cmd="formatBlock" arg="H3" title="Heading 3" />
        </div>

        <div className="flex items-center gap-1 border-r border-white/10 pr-2 mr-1">
          <ToolbarButton icon={AlignLeft} cmd="justifyLeft" title="Align Left" />
          <ToolbarButton icon={AlignCenter} cmd="justifyCenter" title="Align Center" />
          <ToolbarButton icon={AlignRight} cmd="justifyRight" title="Align Right" />
        </div>

        <div className="flex items-center gap-1 border-r border-white/10 pr-2 mr-1">
          <ToolbarButton icon={List} cmd="insertUnorderedList" title="Bullet List" />
          <ToolbarButton icon={ListOrdered} cmd="insertOrderedList" title="Numbered List" />
          <ToolbarButton icon={Quote} cmd="formatBlock" arg="blockquote" title="Quote" />
        </div>

        <div className="flex items-center gap-1">
          <ToolbarButton icon={LinkIcon} onClick={addLink} title="Insert Link" />
          <ToolbarButton icon={ImageIcon} onClick={addImage} title="Insert Image" />
          {/* <ToolbarButton icon={Code} cmd="formatBlock" arg="pre" title="Code Block" /> */}
        </div>
      </div>

      {/* Editable Area */}
      <div 
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="flex-grow p-6 outline-none prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-p:text-gray-300 prose-a:text-tdc-cyan prose-blockquote:border-tdc-cyan prose-img:rounded-lg min-h-[400px]"
        style={{ color: '#d1d5db' }} // Ensure text is visible in dark mode
      />
    </div>
  );
};