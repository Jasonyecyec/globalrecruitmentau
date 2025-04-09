"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Briefcase, Info, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Sample conversations data
const conversations = [
  {
    id: 1,
    company: "TechCorp Inc.",
    jobTitle: "Senior Frontend Developer",
    logo: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for your interest in the position. Would you be available for an interview next week?",
    timestamp: "2 hours ago",
    unread: true,
    messages: [
      {
        id: 1,
        sender: "admin",
        text: "Hello John, I noticed you applied for the Senior Frontend Developer position at TechCorp Inc. I'd like to discuss your application.",
        timestamp: "Yesterday, 2:30 PM",
      },
      {
        id: 2,
        sender: "admin",
        text: "Your experience with React and TypeScript looks impressive. Would you be available for a technical interview next week?",
        timestamp: "Yesterday, 2:32 PM",
      },
      {
        id: 3,
        sender: "user",
        text: "Hi, thank you for reaching out! Yes, I'm very interested in the position and would be happy to schedule an interview.",
        timestamp: "Yesterday, 3:15 PM",
      },
      {
        id: 4,
        sender: "admin",
        text: "Great! How does Tuesday at 2:00 PM EST sound? We'll be conducting the interview via Zoom.",
        timestamp: "Yesterday, 3:45 PM",
      },
      {
        id: 5,
        sender: "user",
        text: "Tuesday at 2:00 PM works perfectly for me. Should I prepare anything specific for the interview?",
        timestamp: "Yesterday, 4:00 PM",
      },
      {
        id: 6,
        sender: "admin",
        text: "Thanks for your interest in the position. Would you be available for an interview next week?",
        timestamp: "2 hours ago",
      },
    ],
  },
  {
    id: 2,
    company: "DesignHub",
    jobTitle: "UX/UI Designer",
    logo: "/placeholder.svg?height=40&width=40",
    lastMessage: "We've reviewed your portfolio and would like to discuss a potential fit for our team.",
    timestamp: "Yesterday",
    unread: false,
    messages: [
      {
        id: 1,
        sender: "admin",
        text: "Hello John, we've reviewed your application for the UX/UI Designer position at DesignHub.",
        timestamp: "2 days ago, 10:15 AM",
      },
      {
        id: 2,
        sender: "admin",
        text: "We've reviewed your portfolio and would like to discuss a potential fit for our team.",
        timestamp: "Yesterday, 9:30 AM",
      },
    ],
  },
];

export default function Messages() {
  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [userConversations, setUserConversations] = useState(conversations);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const updatedConversations = userConversations.map((conv) => {
      if (conv.id === activeConversation.id) {
        const updatedMessages = [
          ...conv.messages,
          {
            id: conv.messages.length + 1,
            sender: "user",
            text: newMessage,
            timestamp: "Just now",
          },
        ];
        return {
          ...conv,
          messages: updatedMessages,
          lastMessage: newMessage,
          timestamp: "Just now",
        };
      }
      return conv;
    });

    setUserConversations(updatedConversations);
    setActiveConversation(
      updatedConversations.find((conv) => conv.id === activeConversation.id) || updatedConversations[0]
    );
    setNewMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="container p-4 sm:px-6 md:py-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
            <p className="text-muted-foreground">
              Communicate with employers about your job applications and opportunities.
            </p>
          </div>
        </div>

        <Tabs defaultValue="inbox" className="w-full">
          <TabsList>
            <TabsTrigger value="inbox" className="relative">
              Inbox
              {userConversations.some((conv) => conv.unread) && (
                <Badge className="ml-2 bg-primary text-primary-foreground">
                  {userConversations.filter((conv) => conv.unread).length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>

          <TabsContent value="inbox" className="mt-4">
            {userConversations.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-[300px_1fr]">
                {/* Conversation List */}
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-muted/50 p-3 border-b">
                    <h3 className="font-medium">Conversations</h3>
                  </div>
                  <ScrollArea className="h-[calc(100vh-250px)]">
                    {userConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`p-3 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                          activeConversation?.id === conversation.id ? "bg-muted/50" : ""
                        }`}
                        onClick={() => setActiveConversation(conversation)}>
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10 rounded-md flex-shrink-0">
                            <AvatarImage src={conversation.logo} alt={conversation.company} />
                            <AvatarFallback className="rounded-md">
                              {conversation.company.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium truncate">{conversation.company}</h4>
                              <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                                {conversation.timestamp}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{conversation.jobTitle}</p>
                            <div className="text-sm truncate flex items-center gap-2">
                              <span className="truncate">{conversation.lastMessage}</span>
                              {conversation.unread && <Badge className="ml-2 h-2 w-2 rounded-full p-0 bg-primary" />}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </div>

                {/* Chat Window */}
                {activeConversation && (
                  <Card className="flex flex-col h-[calc(100vh-250px)]">
                    <CardHeader className="border-b p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 rounded-md">
                          <AvatarImage src={activeConversation.logo} alt={activeConversation.company} />
                          <AvatarFallback className="rounded-md">
                            {activeConversation.company.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{activeConversation.company}</CardTitle>
                          <CardDescription>{activeConversation.jobTitle}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-hidden p-0">
                      <ScrollArea className="h-full p-4">
                        {activeConversation.messages.map((message) => (
                          <div
                            key={message.id}
                            className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                            <div
                              className={`max-w-[80%] rounded-lg p-3 ${
                                message.sender === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                              }`}>
                              <p className="text-sm">{message.text}</p>
                              <p className="mt-1 text-xs opacity-70">{message.timestamp}</p>
                            </div>
                          </div>
                        ))}
                      </ScrollArea>
                    </CardContent>
                    <div className="border-t p-3">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="flex-1"
                        />
                        <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                          <Send className="h-4 w-4 mr-2" />
                          Send
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            ) : (
              <EmptyMessagesState />
            )}
          </TabsContent>

          <TabsContent value="archived" className="mt-4">
            <EmptyMessagesState message="No archived messages" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function EmptyMessagesState({ message = "No messages yet" }: { message?: string }) {
  return (
    <Card className="flex flex-col items-center justify-center p-8 text-center">
      <MessageSquare className="h-12 w-12 text-muted-foreground/50 mb-4" />
      <h3 className="text-lg font-medium">{message}</h3>
      <p className="text-muted-foreground mt-1 max-w-md">
        Messages from employers will appear here. Employers will contact you if they're interested in your application.
      </p>
      <Alert className="mt-6 max-w-md">
        <Info className="h-4 w-4" />
        <AlertTitle>How messaging works</AlertTitle>
        <AlertDescription>
          Employers will initiate conversations with you about job opportunities. Once they message you, you'll be able
          to respond and continue the conversation.
        </AlertDescription>
      </Alert>
    </Card>
  );
}
