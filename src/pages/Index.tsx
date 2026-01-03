import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

type Chat = {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
};

type Message = {
  id: number;
  text: string;
  time: string;
  isOwn: boolean;
  isVoice?: boolean;
  duration?: string;
};

const mockChats: Chat[] = [
  { id: 1, name: 'Анна Смирнова', avatar: '', lastMessage: 'Привет! Как дела?', time: '14:32', unread: 2, online: true },
  { id: 2, name: 'Иван Петров', avatar: '', lastMessage: 'Отправил файлы', time: '13:15', unread: 0, online: false },
  { id: 3, name: 'Мария Иванова', avatar: '', lastMessage: 'Спасибо за помощь!', time: '11:20', unread: 1, online: true },
  { id: 4, name: 'Дмитрий Козлов', avatar: '', lastMessage: 'Увидимся завтра', time: 'Вчера', unread: 0, online: false },
  { id: 5, name: 'Елена Сидорова', avatar: '', lastMessage: 'Отлично, договорились', time: 'Вчера', unread: 0, online: false },
];

const mockMessages: Message[] = [
  { id: 1, text: 'Привет! Как дела?', time: '14:30', isOwn: false },
  { id: 2, text: 'Привет! Всё отлично, спасибо!', time: '14:31', isOwn: true },
  { id: 3, text: 'Как твой проект продвигается?', time: '14:32', isOwn: false },
  { id: 4, text: '', time: '14:33', isOwn: true, isVoice: true, duration: '0:15' },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<'chats' | 'profile' | 'settings'>('chats');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(mockChats[0]);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = mockChats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sendMessage = () => {
    if (messageText.trim()) {
      setMessageText('');
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <aside className="w-20 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-4 gap-6">
        <Button
          variant="ghost"
          size="icon"
          className={`rounded-xl transition-all ${activeTab === 'chats' ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent'}`}
          onClick={() => setActiveTab('chats')}
        >
          <Icon name="MessageSquare" size={24} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`rounded-xl transition-all ${activeTab === 'profile' ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent'}`}
          onClick={() => setActiveTab('profile')}
        >
          <Icon name="User" size={24} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`rounded-xl transition-all ${activeTab === 'settings' ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent'}`}
          onClick={() => setActiveTab('settings')}
        >
          <Icon name="Settings" size={24} />
        </Button>
      </aside>

      {activeTab === 'chats' && (
        <>
          <section className="w-80 border-r border-border flex flex-col bg-card">
            <div className="p-4 space-y-4">
              <h1 className="text-2xl font-bold">Чаты</h1>
              <div className="relative">
                <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Поиск"
                  className="pl-10 bg-secondary border-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="space-y-1 px-2">
                {filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat)}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all hover:bg-accent ${selectedChat?.id === chat.id ? 'bg-accent' : ''}`}
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={chat.avatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {chat.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {chat.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm truncate">{chat.name}</span>
                        <span className="text-xs text-muted-foreground">{chat.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                    </div>
                    {chat.unread > 0 && (
                      <Badge className="bg-primary text-primary-foreground h-5 min-w-5 flex items-center justify-center text-xs">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </section>

          <main className="flex-1 flex flex-col bg-background">
            {selectedChat ? (
              <>
                <header className="h-16 border-b border-border flex items-center justify-between px-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedChat.avatar} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {selectedChat.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="font-semibold">{selectedChat.name}</h2>
                      <p className="text-xs text-muted-foreground">
                        {selectedChat.online ? 'в сети' : 'был(а) недавно'}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Icon name="MoreVertical" size={20} />
                  </Button>
                </header>

                <ScrollArea className="flex-1 p-6">
                  <div className="space-y-4">
                    {mockMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-md rounded-2xl px-4 py-2 ${
                            message.isOwn
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary text-secondary-foreground'
                          }`}
                        >
                          {message.isVoice ? (
                            <div className="flex items-center gap-3 min-w-48">
                              <Button
                                size="icon"
                                variant="ghost"
                                className={`rounded-full h-8 w-8 ${message.isOwn ? 'text-primary-foreground hover:bg-primary-foreground/20' : 'text-primary hover:bg-primary/10'}`}
                              >
                                <Icon name="Play" size={16} />
                              </Button>
                              <div className="flex-1 h-1 bg-current opacity-20 rounded-full" />
                              <span className="text-xs opacity-70">{message.duration}</span>
                            </div>
                          ) : (
                            <p>{message.text}</p>
                          )}
                          <span className="text-xs opacity-70 mt-1 block">{message.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <footer className="border-t border-border p-4">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground">
                      <Icon name="Paperclip" size={20} />
                    </Button>
                    <Input
                      placeholder="Написать сообщение..."
                      className="flex-1 bg-secondary border-0"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground">
                      <Icon name="Mic" size={20} />
                    </Button>
                    <Button size="icon" className="rounded-full" onClick={sendMessage}>
                      <Icon name="Send" size={20} />
                    </Button>
                  </div>
                </footer>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <div className="text-center space-y-2">
                  <Icon name="MessageSquare" size={64} className="mx-auto opacity-20" />
                  <p>Выберите чат, чтобы начать общение</p>
                </div>
              </div>
            )}
          </main>
        </>
      )}

      {activeTab === 'profile' && (
        <main className="flex-1 flex items-center justify-center bg-background">
          <div className="w-full max-w-md space-y-8 p-8">
            <div className="text-center space-y-4">
              <Avatar className="h-32 w-32 mx-auto">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
                  АС
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">Александр Смирнов</h2>
                <p className="text-muted-foreground">@alex_smirnov</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Телефон</Label>
                <p className="font-medium">+7 (999) 123-45-67</p>
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Email</Label>
                <p className="font-medium">alex@example.com</p>
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">О себе</Label>
                <p className="text-sm">Доступен для общения</p>
              </div>
            </div>

            <Button className="w-full" size="lg">
              <Icon name="Edit" size={18} className="mr-2" />
              Редактировать профиль
            </Button>
          </div>
        </main>
      )}

      {activeTab === 'settings' && (
        <main className="flex-1 bg-background overflow-auto">
          <div className="max-w-2xl mx-auto p-8 space-y-8">
            <h1 className="text-3xl font-bold">Настройки</h1>

            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Уведомления</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Звук сообщений</Label>
                      <p className="text-sm text-muted-foreground">Воспроизводить звук при получении сообщения</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push-уведомления</Label>
                      <p className="text-sm text-muted-foreground">Получать уведомления на рабочем столе</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Приватность</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Время последнего визита</Label>
                      <p className="text-sm text-muted-foreground">Показывать когда вы были в сети</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Статус "печатает"</Label>
                      <p className="text-sm text-muted-foreground">Показывать когда вы набираете сообщение</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Чтение сообщений</Label>
                      <p className="text-sm text-muted-foreground">Отправлять уведомление о прочтении</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Внешний вид</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Тёмная тема</Label>
                      <p className="text-sm text-muted-foreground">Использовать тёмное оформление</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Данные и хранилище</h3>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Trash2" size={18} className="mr-2" />
                  Очистить кэш
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Download" size={18} className="mr-2" />
                  Экспорт данных
                </Button>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
