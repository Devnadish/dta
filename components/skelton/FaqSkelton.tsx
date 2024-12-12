import React from 'react'
import { Skeleton } from '../ui/skeleton'

function FaqSkelton() {
    return (
        <div className="flex flex-col gap-1 items-center justify-center w-full ">
            <div className="flex flex-row  items-center justify-between w-full ">
                <Skeleton className="h-8 w-[120px] rounded-md " />
                <Skeleton className="h-7 w-[50px] rounded-md" />
            </div>
            <Skeleton className="h-[300px] w-full rounded-md" />
        </div>
    )
}



export default FaqSkelton