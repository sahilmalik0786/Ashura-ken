import {
  PromptInput,
  PromptInputButton,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from '@/components/ui/shadcn-io/ai/prompt-input';
import { useChatId } from '@/hooks/useChatId';
// import { queryClient } from '@/queryClient';
import { MicIcon, PaperclipIcon } from 'lucide-react';
import {  useState } from 'react';
import { useNavigate, useParams } from 'react-router';
const models = [
  { id: 'gpt-4o', name: 'GPT-4o' },
  { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet' },
  { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro' },
];
const DraftInput = ({...props}) => {

 
  const {text,setText,setMsg ,socket} = props
  const navigate = useNavigate()
  
  const [model, setModel] = useState(models[0].id);
  const [status, setStatus] = useState('ready');
  const chatId = useChatId(text)
  const handleSubmit =async (event) => {
    event.preventDefault();
    const trimmed = text.trim()
    console.log(trimmed)
    if (!text || !trimmed) {
      return;
    }
              try {  
            const chatID =  await chatId.mutateAsync(trimmed); // calls backend
        
      // await queryClient.invalidateQueries();
          
        //   await queryClient.invalidateQueries({ queryKey: ["chats"] })
          navigate(`/dashboard/chat/${chatID?.id}`); // redirect after success
    } catch (err) {
      console.error("chat Id not generated:", err);
    }

   

        
  };
  return (
    <div className='p-8 w-full'>
    <PromptInput onSubmit={handleSubmit}>
      <PromptInputTextarea
        onChange={(e) => setText(e.target.value)}
        value={text}
        placeholder="Type your message..."
      />
      <PromptInputToolbar>
        <PromptInputTools>
          <PromptInputButton>
            <PaperclipIcon size={16} />
          </PromptInputButton>
          <PromptInputButton>
            <MicIcon size={16} />
            <span>Voice</span>
          </PromptInputButton>
          <PromptInputModelSelect onValueChange={setModel} value={model}>
            <PromptInputModelSelectTrigger>
              <PromptInputModelSelectValue />
            </PromptInputModelSelectTrigger>
            <PromptInputModelSelectContent>
              {models.map((model) => (
                <PromptInputModelSelectItem key={model.id} value={model.id}>
                  {model.name}
                </PromptInputModelSelectItem>
              ))}
            </PromptInputModelSelectContent>
          </PromptInputModelSelect>
        </PromptInputTools>
      
        <PromptInputSubmit disabled={!text} status={status} />
      </PromptInputToolbar>
    </PromptInput></div>
  );
};
export default DraftInput;