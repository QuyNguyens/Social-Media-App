import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {formatDate, formatDistanceToNowStrict} from "date-fns"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRelativeDate(from : string){
  const currentDate = new Date();
  const formattedDateString = from.replace(" ", "T");
  const dateObj = new Date(formattedDateString);
  if (currentDate.getTime() - dateObj.getTime() < 24 * 60 *60 * 1000){
    return formatDistanceToNowStrict(dateObj, {addSuffix: true})
  }else{
    if(currentDate.getFullYear() === dateObj.getFullYear()){
      return formatDate(dateObj, "MMM d");
    }else{
      return formatDate(dateObj, "MMM d, yyy");
    }
  }
}