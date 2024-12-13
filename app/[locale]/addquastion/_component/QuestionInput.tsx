import { Textarea } from "@/components/ui/textarea";

const QuestionInput = ({ 
    question,
    setQuestion,
    onError
}: { 
    question: string;
    setQuestion: (question: string) => void;
    onError: (message: string) => void;
}) => {
    const MAX_LENGTH = 500;
    const MIN_LENGTH = 10;
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        
        // Prevent exceeding max length
        if (value.length > MAX_LENGTH) {
            onError(`Question cannot exceed ${MAX_LENGTH} characters`);
            return;
        }
        
        setQuestion(value);
    };

    const getRemainingChars = () => MAX_LENGTH - question.length;
    
    const getCharacterCountColor = () => {
        const remaining = getRemainingChars();
        if (question.length < MIN_LENGTH) return "text-red-500";
        if (remaining < MAX_LENGTH * 0.2) return "text-orange-500";
        return "text-gray-500";
    };

    const isValidLength = question.length >= MIN_LENGTH && question.length <= MAX_LENGTH;
    const hasSpecialCharsOnly = /^[^a-zA-Z0-9]+$/.test(question);
    const isValid = isValidLength && !hasSpecialCharsOnly;

    const handleClear = () => {
        setQuestion("");
    };

    return (
        <div className="w-full space-y-2">
            <div className="flex justify-between items-center">
                <label className="block text-sm font-medium">Your Question</label>
                <span className={`text-xs ${getCharacterCountColor()}`}>
                    {getRemainingChars()} characters remaining
                </span>
            </div>
            <div className="relative">
                <Textarea
                    value={question}
                    onChange={handleChange}
                    placeholder="Type your question here... (min 10 characters)"
                    className={`min-h-[100px] bg-gray-100 dark:bg-gray-700 rounded-md pr-16 ${
                        !isValid && question.length > 0 ? 'border-red-500' : ''
                    }`}
                    maxLength={MAX_LENGTH}
                />
                <div className="absolute bottom-2 right-2 flex gap-2 items-center">
                    {question.length > 0 && (
                        <button
                            onClick={handleClear}
                            className="text-gray-500 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                            title="Clear text"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="16" 
                                height="16" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="15" y1="9" x2="9" y2="15"/>
                                <line x1="9" y1="9" x2="15" y2="15"/>
                            </svg>
                        </button>
                    )}
                    <div className={`text-xs font-medium ${getCharacterCountColor()} bg-white dark:bg-gray-800 px-2 py-1 rounded-full shadow-sm`}>
                        {getRemainingChars()}
                    </div>
                </div>
            </div>
            
            {/* Validation Messages */}
            <div className="text-xs space-y-1">
                {question.length > 0 && (
                    <>
                        {question.length < MIN_LENGTH && (
                            <p className="text-red-500">
                                ⚠️ Question must be at least {MIN_LENGTH} characters long
                            </p>
                        )}
                        {hasSpecialCharsOnly && (
                            <p className="text-red-500">
                                ⚠️ Question cannot contain only special characters
                            </p>
                        )}
                        {getRemainingChars() < MAX_LENGTH * 0.2 && (
                            <p className="text-orange-500">
                                ℹ️ Only {getRemainingChars()} characters remaining
                            </p>
                        )}
                    </>
                )}
                <ul className="text-gray-500 list-disc pl-4 pt-1">
                    <li>Must be between {MIN_LENGTH} and {MAX_LENGTH} characters</li>
                    <li>Cannot contain only special characters</li>
                    <li>Should be clear and specific</li>
                </ul>
            </div>
        </div>
    );
};
export default QuestionInput;