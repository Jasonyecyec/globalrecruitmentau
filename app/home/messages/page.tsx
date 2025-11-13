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
	MessageSquare,
	Info,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const conversations = [
	{
		id: 1,
		company: "TechCorp Inc.",
		position: "Senior Frontend Developer",
		avatar: "https://github.com/shadcn.png",
		lastMessage:
			"Thanks for your interest. Would you be available for an interview next week?",
		timestamp: "2 hours ago",
		unread: 2,
		online: true,
		messages: [
			{
				id: 1,
				senderType: "employer",
				message:
					"Hello! We reviewed your application for the Senior Frontend Developer position.",
				timestamp: "Yesterday, 2:30 PM",
			},
			{
				id: 2,
				senderType: "employer",
				message:
					"Your experience with React and TypeScript looks impressive. Would you be available for a technical interview?",
				timestamp: "Yesterday, 2:32 PM",
			},
			{
				id: 3,
				senderType: "jobseeker",
				message:
					"Hi! Thank you for reaching out. Yes, I'm very interested in the position and would be happy to schedule an interview.",
				timestamp: "Yesterday, 3:15 PM",
			},
			{
				id: 4,
				senderType: "employer",
				message:
					"Great! How does Tuesday at 2:00 PM sound? We'll conduct the interview via Zoom.",
				timestamp: "Yesterday, 3:45 PM",
			},
			{
				id: 5,
				senderType: "jobseeker",
				message:
					"Tuesday at 2:00 PM works perfectly for me. Should I prepare anything specific?",
				timestamp: "Yesterday, 4:00 PM",
			},
			{
				id: 6,
				senderType: "employer",
				message:
					"Thanks for your interest. Would you be available for an interview next week?",
				timestamp: "2 hours ago",
			},
		],
	},
	{
		id: 2,
		company: "DesignHub",
		position: "UX/UI Designer",
		avatar: "https://github.com/shadcn.png",
		lastMessage:
			"We've reviewed your portfolio and would like to discuss next steps.",
		timestamp: "Yesterday",
		unread: 0,
		online: false,
		messages: [
			{
				id: 1,
				senderType: "employer",
				message:
					"Hello! We've reviewed your application for the UX/UI Designer position.",
				timestamp: "2 days ago, 10:15 AM",
			},
			{
				id: 2,
				senderType: "employer",
				message:
					"We've reviewed your portfolio and would like to discuss next steps.",
				timestamp: "Yesterday, 9:30 AM",
			},
		],
	},
	{
		id: 3,
		company: "StartupXYZ",
		position: "React Developer",
		avatar: "https://github.com/shadcn.png",
		lastMessage: "Looking forward to speaking with you soon!",
		timestamp: "2 days ago",
		unread: 0,
		online: true,
		messages: [
			{
				id: 1,
				senderType: "employer",
				message: "Hi! We're impressed with your React experience.",
				timestamp: "3 days ago, 11:00 AM",
			},
			{
				id: 2,
				senderType: "jobseeker",
				message:
					"Thank you! I'm excited about the opportunity to work with your team.",
				timestamp: "3 days ago, 2:30 PM",
			},
			{
				id: 3,
				senderType: "employer",
				message: "Looking forward to speaking with you soon!",
				timestamp: "2 days ago, 9:00 AM",
			},
		],
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
		conv.company.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<div className="p-4 sm:px-6 md:py-8">
			<div className="flex flex-col gap-4 mb-4">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Messages</h1>
					<p className="text-muted-foreground">
						Communicate with employers about job opportunities
					</p>
				</div>
			</div>

			{conversations.length === 0 ? (
				<EmptyMessagesState />
			) : (
				<div className="grid md:grid-cols-[340px_1fr] gap-4 h-[calc(100vh-200px)]">
					{/* CONVERSATIONS LIST */}
					<Card className="flex flex-col">
						<CardHeader className="pb-3">
							<div className="flex items-center justify-between">
								<CardTitle className="text-lg">Conversations</CardTitle>
								{conversations.filter((c) => c.unread > 0).length > 0 && (
									<Badge className="bg-mainColor">
										{conversations.filter((c) => c.unread > 0).length}
									</Badge>
								)}
							</div>
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
											<Avatar className="h-10 w-10 rounded-md">
												<AvatarImage src={conversation.avatar} />
												<AvatarFallback className="rounded-md">
													{conversation.company
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
													{conversation.company}
												</p>
												<span className="text-xs text-muted-foreground shrink-0">
													{conversation.timestamp}
												</span>
											</div>
											<p className="text-xs text-muted-foreground truncate">
												{conversation.position}
											</p>
											<div className="flex items-center gap-2 mt-1">
												<p className="text-sm text-muted-foreground truncate flex-1">
													{conversation.lastMessage}
												</p>
												{conversation.unread > 0 && (
													<Badge className="bg-mainColor h-5 min-w-5 flex items-center justify-center p-1 text-xs">
														{conversation.unread}
													</Badge>
												)}
											</div>
										</div>
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
										<Avatar className="h-10 w-10 rounded-md">
											<AvatarImage src={selectedConversation.avatar} />
											<AvatarFallback className="rounded-md">
												{selectedConversation.company
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
											{selectedConversation.company}
										</p>
										<p className="text-xs text-muted-foreground">
											{selectedConversation.position}
										</p>
									</div>
								</div>
								<Button variant="ghost" size="icon">
									<MoreVertical className="h-4 w-4" />
								</Button>
							</div>
						</CardHeader>
						<Separator />

						{/* MESSAGES */}
						<ScrollArea className="flex-1 p-4">
							<div className="space-y-4">
								{selectedConversation.messages.map((msg) => (
									<div
										key={msg.id}
										className={`flex ${msg.senderType === "jobseeker" ? "justify-end" : "justify-start"}`}
									>
										<div
											className={`max-w-[75%] rounded-lg p-3 ${
												msg.senderType === "jobseeker"
													? "bg-mainColor text-white"
													: "bg-accent"
											}`}
										>
											<p className="text-sm">{msg.message}</p>
											<p
												className={`text-xs mt-1 ${
													msg.senderType === "jobseeker"
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
									disabled={!messageInput.trim()}
									className="bg-mainColor hover:bg-orange-400"
									size="icon"
								>
									<Send className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</Card>
				</div>
			)}
		</div>
	);
}

function EmptyMessagesState() {
	return (
		<Card className="flex flex-col items-center justify-center p-12 text-center">
			<MessageSquare className="h-16 w-16 text-muted-foreground/50 mb-4" />
			<h3 className="text-xl font-semibold mb-2">No messages yet</h3>
			<p className="text-muted-foreground max-w-md mb-6">
				Messages from employers will appear here. Employers will contact you if
				they're interested in your application.
			</p>
			<Alert className="max-w-md">
				<Info className="h-4 w-4" />
				<AlertTitle>How messaging works</AlertTitle>
				<AlertDescription>
					Employers will initiate conversations with you about job opportunities.
					Once they message you, you'll be able to respond and continue the
					conversation.
				</AlertDescription>
			</Alert>
		</Card>
	);
}
