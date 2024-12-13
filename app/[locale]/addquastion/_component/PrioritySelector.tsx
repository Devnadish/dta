import { Button } from "@/components/ui/button";

const PrioritySelector = ({ 
    priority, 
    setPriority 
}: { 
    priority: number; 
    setPriority: (priority: number) => void; 
}) => {
    return (
        <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Priority Level</label>
            <div className="flex gap-2 flex-wrap">
                {[1, 2, 3, 4, 5].map((level) => (
                    <Button
                        key={level}
                        onClick={() => setPriority(level)}
                        className={`px-4 py-2 rounded ${
                            priority === level 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                    >
                        {level}
                    </Button>
                ))}
            </div>
        </div>
    );
};
export default PrioritySelector;