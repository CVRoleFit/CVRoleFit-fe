import { Input } from "@/shared/components";
import type { PersonalInfo } from "@/features/cv/types";
import { AIAssistButton } from "./AIAssistButton";

interface PersonalInfoSectionProps {
  personalInfo: PersonalInfo;
  onUpdate: (info: Partial<PersonalInfo>) => void;
  onAIAssist: (field: string) => void;
  isGenerating?: boolean;
}

export function PersonalInfoSection({ personalInfo, onUpdate, onAIAssist, isGenerating }: PersonalInfoSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Personal Information</h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Full Name"
          value={personalInfo.fullName}
          onChange={(e) => onUpdate({ fullName: e.target.value })}
          placeholder="John Doe"
        />
        <Input
          label="Email"
          type="email"
          value={personalInfo.email}
          onChange={(e) => onUpdate({ email: e.target.value })}
          placeholder="john@example.com"
        />
        <Input
          label="Phone"
          type="tel"
          value={personalInfo.phone}
          onChange={(e) => onUpdate({ phone: e.target.value })}
          placeholder="+1 (555) 123-4567"
        />
        <Input
          label="Location"
          value={personalInfo.location}
          onChange={(e) => onUpdate({ location: e.target.value })}
          placeholder="San Francisco, CA"
        />
        <Input
          label="LinkedIn"
          value={personalInfo.linkedin ?? ""}
          onChange={(e) => onUpdate({ linkedin: e.target.value })}
          placeholder="linkedin.com/in/johndoe"
        />
        <Input
          label="Website"
          type="url"
          value={personalInfo.website ?? ""}
          onChange={(e) => onUpdate({ website: e.target.value })}
          placeholder="https://johndoe.com"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Professional Summary</label>
          <AIAssistButton
            onClick={() => onAIAssist("summary")}
            isLoading={isGenerating}
            label="Generate"
          />
        </div>
        <textarea
          value={personalInfo.summary}
          onChange={(e) => onUpdate({ summary: e.target.value })}
          placeholder="Write a compelling summary of your professional background and career goals..."
          rows={4}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
        />
      </div>
    </div>
  );
}
