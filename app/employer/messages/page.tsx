"use client";
import React, { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
	Search,
	Send,
	Paperclip,
	MoreVertical,
	Phone,
	Video,
} from "lucide-react";

const conversations = [
	{
		id: 1,
		candidateName: "Sarah Johnson",
		position: "Frontend Developer",
		avatar: "https://github.com/shadcn.png",
		lastMessage: "Thank you for the opportunity! I'm very interested.",
		timestamp: "2 hours ago",
		unread: 2,
		online: true,
	},
	{
		id: 2,
		candidateName: "Michael Chen",
		position: "UX/UI Designer",
		avatar: "https://github.com/shadcn.png",
		lastMessage: "I'd love to discuss the role further.",
		timestamp: "5 hours ago",
		unread: 0,
		online: false,
	},
	{
		id: 3,
		candidateName: "Emily Rodriguez",
		position: "Backend Engineer",
		avatar: "https://github.com/shadcn.png",
		lastMessage: "When would be a good time for an interview?",
		timestamp: "1 day ago",
		unread: 1,
		online: true,
	},
	{
		id: 4,
		candidateName: "David Kim",
		position: "Product Manager",
		avatar: "https://github.com/shadcn.png",
		lastMessage: "I have attached my portfolio as requested.",
		timestamp: "2 days ago",
		unread: 0,
		online: false,
	},
];

const messages = [
	{
		id: 1,
		senderId: 1,
		senderType: "candidate",
		message: "Hello! Thank you for reviewing my application.",
		timestamp: "10:30 AM",
	},
	{
		id: 2,
		senderId: 0,
		senderType: "employer",
		message:
			"Hi Sarah! We were impressed with your portfolio. Would you be available for a quick chat this week?",
		timestamp: "10:45 AM",
	},
	{
		id: 3,
		senderId: 1,
		senderType: "candidate",
		message:
			"Absolutely! I'm available Tuesday or Thursday afternoon. What time works best for you?",
		timestamp: "11:00 AM",
	},
	{
		id: 4,
		senderId: 0,
		senderType: "employer",
		message:
			"Thursday at 2 PM would be perfect. I'll send you a calendar invite with the video call link.",
		timestamp: "11:15 AM",
	},
	{
		id: 5,
		senderId: 1,
		senderType: "candidate",
		message: "Thank you for the opportunity! I'm very interested.",
		timestamp: "11:20 AM",
	},
];

export default function Messages() {
	const [selectedConversation, setSelectedConversation] = useState(
		conversations[0],
	);
	const [searchQuery, setSearchQuery] = useState("");
	const [messageInput, setMessageInput] = useState("");

	const handleSendMessage = () => {
		if (messageInput.trim()) {
			// Handle send message logic here
			setMessageInput("");
		}
	};

	const filteredConversations = conversations.filter((conv) =>
		conv.candidateName.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<div className="p-4 sm:px-6 md:py-8">
			<div className="flex flex-col gap-4 mb-4">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Messages</h1>
					<p className="text-muted-foreground">
						Communicate with candidates
					</p>
				</div>
			</div>

			<div className="grid md:grid-cols-[320px_1fr] gap-4 h-[calc(100vh-200px)]">
				{/* CONVERSATIONS LIST */}
				<Card className="flex flex-col">
					<CardHeader className="pb-3">
						<CardTitle className="text-lg">Conversations</CardTitle>
						<div className="relative mt-2">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Search conversations..."
								className="pl-8"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
					</CardHeader>
					<Separator />
					<ScrollArea className="flex-1">
						<div className="space-y-1 p-2">
							{filteredConversations.map((conversation) => (
								<div
									key={conversation.id}
									className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-accent transition-colors ${
										selectedConversation.id === conversation.id
											? "bg-accent"
											: ""
									}`}
									onClick={() => setSelectedConversation(conversation)}
								>
									<div className="relative">
										<Avatar className="h-10 w-10">
											<AvatarImage src={conversation.avatar} />
											<AvatarFallback>
												{conversation.candidateName
													.split(" ")
													.map((n) => n[0])
													.join("")}
											</AvatarFallback>
										</Avatar>
										{conversation.online && (
											<div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
										)}
									</div>
									<div className="flex-1 min-w-0">
										<div className="flex items-center justify-between gap-2">
											<p className="font-semibold text-sm truncate">
												{conversation.candidateName}
											</p>
											<span className="text-xs text-muted-foreground shrink-0">
												{conversation.timestamp}
											</span>
										</div>
										<p className="text-xs text-muted-foreground truncate">
											{conversation.position}
										</p>
										<p className="text-sm text-muted-foreground truncate mt-1">
											{conversation.lastMessage}
										</p>
									</div>
									{conversation.unread > 0 && (
										<Badge className="bg-mainColor shrink-0">
											{conversation.unread}
										</Badge>
									)}
								</div>
							))}
						</div>
					</ScrollArea>
				</Card>

				{/* CHAT AREA */}
				<Card className="flex flex-col">
					<CardHeader className="pb-3">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="relative">
									<Avatar className="h-10 w-10">
										<AvatarImage src={selectedConversation.avatar} />
										<AvatarFallback>
											{selectedConversation.candidateName
												.split(" ")
												.map((n) => n[0])
												.join("")}
										</AvatarFallback>
									</Avatar>
									{selectedConversation.online && (
										<div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
									)}
								</div>
								<div>
									<p className="font-semibold">
										{selectedConversation.candidateName}
									</p>
									<p className="text-xs text-muted-foreground">
										Applied for {selectedConversation.position}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<Button variant="ghost" size="icon">
									<Phone className="h-4 w-4" />
								</Button>
								<Button variant="ghost" size="icon">
									<Video className="h-4 w-4" />
								</Button>
								<Button variant="ghost" size="icon">
									<MoreVertical className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</CardHeader>
					<Separator />

					{/* MESSAGES */}
					<ScrollArea className="flex-1 p-4">
						<div className="space-y-4">
							{messages.map((msg) => (
								<div
									key={msg.id}
									className={`flex ${msg.senderType === "employer" ? "justify-end" : "justify-start"}`}
								>
									<div
										className={`max-w-[70%] rounded-lg p-3 ${
											msg.senderType === "employer"
												? "bg-mainColor text-white"
												: "bg-accent"
										}`}
									>
										<p className="text-sm">{msg.message}</p>
										<p
											className={`text-xs mt-1 ${
												msg.senderType === "employer"
													? "text-white/70"
													: "text-muted-foreground"
											}`}
										>
											{msg.timestamp}
										</p>
									</div>
								</div>
							))}
						</div>
					</ScrollArea>

					{/* MESSAGE INPUT */}
					<Separator />
					<div className="p-4">
						<div className="flex items-center gap-2">
							<Button variant="ghost" size="icon">
								<Paperclip className="h-4 w-4" />
							</Button>
							<Input
								placeholder="Type your message..."
								value={messageInput}
								onChange={(e) => setMessageInput(e.target.value)}
								onKeyPress={(e) => {
									if (e.key === "Enter" && !e.shiftKey) {
										e.preventDefault();
										handleSendMessage();
									}
								}}
							/>
							<Button
								onClick={handleSendMessage}
								className="bg-mainColor hover:bg-orange-400"
								size="icon"
							>
								<Send className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
}
