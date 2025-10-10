import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, ChevronDown } from "lucide-react";

interface Props {
  onChange: (selected: string[]) => void;
  value: string[];
}

type filteredCountries = {
  name: string;
  flag: string;
  alt: string;
}[];

type Country = {
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  name: {
    common: string;
    official: string;
    nativeName?: {
      [languageCode: string]: {
        official: string;
        common: string;
      };
    };
  };
};
export function CountrySelector({ onChange, value: countries }: Props) {
  const [filtered, setFiltered] = useState<filteredCountries>([]);
  const [selected, setSelected] = useState<string[]>(countries);
  const [search, setSearch] = useState("");
  const [allCountries, setAllCountries] = useState<filteredCountries>([]);
  const [loading, setLoading] = useState(false);

  // Fetch countries once when Popover opens
  const fetchCountries = async () => {
    if (countries.length > 0) return; // prevent refetch
    setLoading(true);
    try {
      const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,code"
      );
      const data: Country[] = await res.json();
      const names = data
        .map((c) => ({
          flag: c.flags.png,
          alt: c.flags.alt || "",
          name: c.name.common,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

      setAllCountries(names);
      setFiltered(names);
    } catch (err) {
      console.error("Error fetching countries:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter countries
  useEffect(() => {
    if (!search.trim()) setFiltered(allCountries);
    else {
      const query = search.toLowerCase();
      setFiltered(
        allCountries.filter((c) => c.name.toLowerCase().includes(query))
      );
    }
  }, [search, allCountries, onChange, selected]);

  const toggleSelect = (country: string) => {
    let newValues = [...selected];
    if (selected.includes(country)) {
      newValues = newValues.filter((c) => c !== country);
    } else {
      newValues.push(country);
    }
    setSelected(newValues);
    onChange(newValues);
  };

  const removeSelected = (country: string) => {
    let newValues = [...selected];
    newValues = newValues.filter((c) => c !== country);
    setSelected(newValues);
    onChange(newValues);
  };

  return (
    <Popover onOpenChange={(open) => open && fetchCountries()}>
      <PopoverTrigger asChild className="w-full">
        <div className="border rounded-md p-2 flex flex-wrap items-center gap-2 min-w-[250px] justify-between">
          <div className="flex flex-wrap gap-1">
            {selected.length > 0 ? (
              selected.map((c) => (
                <Badge
                  key={c}
                  className="flex items-center gap-1 cursor-pointer "
                >
                  {c}
                  <button
                    className="group cursor-pointer rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSelected(c);
                    }}
                  >
                    <X className="h-3 w-3 group-hover:text-red-500" />
                  </button>
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground text-sm">
                Select countries...
              </span>
            )}
          </div>
          <ChevronDown className="h-4 w-4 opacity-60" />
        </div>
      </PopoverTrigger>

      <PopoverContent className="p-3 w-full" align="start">
        <div className="space-y-2">
          <Input
            placeholder="Search country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-2"
          />
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : (
            <ScrollArea className="h-[200px]">
              <div className="space-y-1">
                {filtered.map((country) => (
                  <div className="flex items-center gap-2" key={country?.name}>
                    <img
                      src={country?.flag}
                      alt={country?.alt}
                      width={24}
                      height={8}
                    />
                    <div
                      onClick={() => toggleSelect(country?.name)}
                      className={`cursor-pointer px-2 py-1 rounded-md text-sm hover:bg-accent ${
                        selected.includes(country?.name)
                          ? "bg-accent text-accent-foreground"
                          : ""
                      }`}
                    >
                      {country?.name}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
