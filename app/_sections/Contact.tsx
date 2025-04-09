import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <section className="bg-gray-50 py-16" id="contact">
      <div className="mx-auto max-w-6xl px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Contact Info */}
        <div className="text-center md:text-left">
          <p className="text-2xl font-semibold mb-2">Reach us directly:</p>
          <p className="mb-1 text-lg">
            <span className="font-medium text-gray-500">Email:</span> admin@recruitmentglobal.com
          </p>
          <p className="text-lg">
            <span className="font-medium text-gray-500">Phone:</span> +61 415 902 882
          </p>
        </div>

        {/* Contact Form */}
        <div className="w-full">
          <h2 className="mb-10 text-center text-3xl font-bold">Contact Our Global Team</h2>
          <form className="space-y-6">
            <Input placeholder="Your Name" className="bg-white" />
            <Input placeholder="Your Email" type="email" className="bg-white" />
            <Input placeholder="Subject" className="bg-white" />
            <textarea
              className="w-full rounded-md border p-3 resize-none bg-white"
              rows={3}
              placeholder="Your Message"></textarea>
            <Button className="w-full bg-[#1E1147] hover:bg-[#2a1a61]">Send Message</Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
