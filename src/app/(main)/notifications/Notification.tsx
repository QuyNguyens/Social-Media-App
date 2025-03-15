"use client"

import UserAvatar from '@/components/UserAvatar'
import kyInstance from '@/lib/ky'
import { Notification as NotificationData, NotificationsPage, NotificationType } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import { Heart, MessageCircle, User2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useSession } from '../SessionProvider'

interface NotificationProps{
  notification: NotificationData
}

const Notification = ({notification}: NotificationProps) => {

  const router = useRouter();
  const queryClient = useQueryClient();
  const {user, setUser} = useSession();
  
  const mapNotificationType = (type: NotificationType) => {
          switch(type){
              case NotificationType.FOLLOW:
                  return {
                      message: `${notification.issuer.userName} followed you`,
                      icon: <User2 className='size-7 text-primary'/>,
                      href: `users/${notification.issuer.email}`
                  }
              case NotificationType.COMMENT:
                return {
                  message: `${notification.issuer.userName} commented on your post`,
                  icon: <MessageCircle className='size-7 fill-primary text-primary'/>,
                  href: `posts/${notification.postId}`
                }
              case NotificationType.LIKE:
                return {
                  message: `${notification.issuer.userName} liked your post`,
                  icon: <Heart className='size-7 fill-red-500 text-red-500'/>,
                  href: `posts/${notification.postId}`
                }
          }
      }
    const notificationData = mapNotificationType(notification.type);
  
    const handleNavigation = async (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.preventDefault();
  
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/notificate/notificate/${notification.id}`
      await kyInstance.post(url);

       queryClient.setQueryData(["notification", "for-you"], (oldData: { pages: NotificationsPage[] } | undefined) => {
        if (!oldData) return undefined;
      
        const data = {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              notifications: page.notifications.map(notificate =>
                notificate.id === notification.id  ? { ...notificate, isReaded: true } : notificate
              ),
            })),
          };
        return data;
      });

      setUser({...user, notificationCount: user.notificationCount ? user.notificationCount - 1 : 0  })
      router.push(notificationData.href);
    };

  return (
    <Link
      href={notificationData.href}
      onClick={handleNavigation}
      className='block'
    >
      <article className={cn("flex gap-3 rounded-2xl bg-card p-5 shadow-sm transition-colors hover:bg-card/70",
        !notification.isReaded && "bg-primary/10")}>
          <div className='my-1'>{notificationData.icon}</div>
          <div className='flex flex-col gap-2'>
            <UserAvatar avatarUrl={notification.issuer.avatar} size={30}/>
            <div>
              <span className='font-bold'>{notification.issuer.email}</span>{" "}
              <span>{notificationData.message}</span>
            </div>
            {
              notification && (
                <div className='line-clamp-3 whitespace-pre-line text-muted-foreground'>
                  {notification.content}
                </div>
              )
            }
          </div>
        </article>
    </Link>
  )
}

export default Notification