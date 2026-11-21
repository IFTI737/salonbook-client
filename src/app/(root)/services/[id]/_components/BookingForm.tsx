"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarCheck } from "lucide-react";
import { toast } from "sonner";
import { cn } from "cn";
import { TIME_SLOTS } from "@/lib/constants";
import { todayString } from "@/lib/format";
import { bookAppointment } from "@/lib/action/appointments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");

// "02:00 PM" -> minutes since midnight, used to hide slots that already passed today
const slotMinutes = (slot: string) => {
  const [time, period] = slot.split(" ");
  const [h, m] = time.split(":").map(Number);
  return ((h % 12) + (period === "PM" ? 12 : 0)) * 60 + m;
};

export default function BookingForm({ serviceId }: { serviceId: string }) {
  const router = useRouter();
  const [date, setDate] = useState(todayString());
  const [slot, setSlot] = useState("");
  const [message, setMessage] = useState("");
  const [booked, setBooked] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  // bumped after a failed booking so the taken slots are loaded again
  const [reloadKey, setReloadKey] = useState(0);

  // load slots already taken for the chosen day
  useEffect(() => {
    let ignore = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoadingSlots(true);
    fetch(`${API_URL}/services/booked-slots?serviceId=${serviceId}&date=${date}`)
      .then((r) => r.json())
      .then((body) => !ignore && setBooked(body?.success ? body.data : []))
      .catch(() => !ignore && setBooked([]))
      .finally(() => !ignore && setLoadingSlots(false));
    return () => {
      ignore = true;
    };
  }, [serviceId, date, reloadKey]);

  const isToday = date === todayString();
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slot) {
      toast.error("Please choose a time slot");
      return;
    }
    setSubmitting(true);
    const res = await bookAppointment({ serviceId, appointmentDate: date, timeSlot: slot, message });
    if (!res.success) {
      toast.error(res.message);
      setSubmitting(false);
      // someone may have taken the slot: refresh the list
      if (res.message.toLowerCase().includes("slot")) {
        setSlot("");
        setReloadKey((k) => k + 1);
      }
      return;
    }
    toast.success("Appointment booked! The salon will confirm it soon.");
    router.push("/dashboard/customer/appointments");
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-primary uppercase">
        <CalendarCheck className="size-4" /> Book this service
      </p>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="date">Appointment date</FieldLabel>
          <Input
            id="date"
            type="date"
            min={todayString()}
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setSlot("");
            }}
            required
          />
        </Field>

        <Field>
          <FieldLabel>Time slot</FieldLabel>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {TIME_SLOTS.map((t) => {
              const taken = booked.includes(t);
              const passed = isToday && slotMinutes(t) <= nowMinutes;
              const disabled = loadingSlots || taken || passed;
              return (
                <button
                  key={t}
                  type="button"
                  disabled={disabled}
                  onClick={() => setSlot(t)}
                  aria-pressed={slot === t}
                  className={cn(
                    "rounded-full border px-2 py-2 font-mono text-xs font-medium transition-colors",
                    slot === t ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary hover:text-primary",
                    disabled && "cursor-not-allowed opacity-40 line-through hover:border-border hover:text-current",
                  )}
                >
                  {t}
                </button>
              );
            })}
          </div>
          <FieldDescription>
            {loadingSlots ? "Checking free slots..." : "Crossed-out slots are already booked or have passed."}
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="message">Message (optional)</FieldLabel>
          <Textarea
            id="message"
            value={message}
            maxLength={500}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Anything we should know? e.g. hair length, allergies, style ideas"
          />
        </Field>

        <Button type="submit" size="lg" className="h-12 w-full rounded-full text-base" disabled={submitting}>
          {submitting && <Spinner />}
          {submitting ? "Booking..." : "Book Appointment"}
        </Button>
      </FieldGroup>
    </form>
  );
}
