'use client';

import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import { Button } from "./button";
import { useRouter } from "next/navigation";

function ButtonRefresh() {
    const router = useRouter();
    const handleClick = () => {
        router.refresh();

    }
    return (
        <Button onClick={handleClick} variant={"ghost"} className="p-1 rounded hover:bg-gray-200 focus:outline-none">
            <ArrowPathIcon className="h-4 w-4 text-gray-600" />
        </Button>
    )
}

export default ButtonRefresh;