import { useToast } from "@/hooks/use-toast";

export const useNotificationToast = () => {
  const { toast } = useToast();

  const showToastmessage = (message: string) => {
    toast({
      title: "Notification",
      description: message,
    });
  };

  return showToastmessage;
};
