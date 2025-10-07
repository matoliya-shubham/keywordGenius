import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Link } from "lucide-react";

export type Competitor = {
  id: string;
  name: string;
  url?: string;
};
type Props = {
  onChange: (competitors: Competitor[]) => void;
  value: Competitor[];
};

export function CompetitorSelector({ onChange, value }: Props) {
  const [competitors, setCompetitors] = useState<Competitor[]>(value || []);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!name.trim()) return; // required field

    const newCompetitor: Competitor = {
      id: crypto.randomUUID(),
      name: name.trim(),
      url: url.trim() || undefined,
    };

    setCompetitors((prev) => [...prev, newCompetitor]);
    onChange(competitors);
    setName("");
    setUrl("");
    setOpen(false);
  };

  const handleRemove = (id: string) => {
    setCompetitors((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex flex-wrap gap-2 items-center border rounded-md p-2">
        {competitors?.length > 0 ? (
          competitors.map((c) => (
            <Badge
              key={c.id}
              className="flex items-center gap-1 hover:bg-red-500 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(c.id);
              }}
            >
              {c.url && <Link className="h-3 w-3" />}
              {c.name}
              <X className="h-3 w-3 cursor-pointer" />
            </Badge>
          ))
        ) : (
          <span className="text-muted-foreground text-sm">
            No competitors added
          </span>
        )}
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 w-[15rem] cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Add Competitor
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[25rem] p-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="competitor-name">Name *</Label>
              <Input
                id="competitor-name"
                placeholder="Enter competitor name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="competitor-url">URL</Label>
              <Input
                id="competitor-url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" disabled={!name.trim()}>
                Save
              </Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}
