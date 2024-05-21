"use client";

import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import styles from "./Search.module.scss";
import SearchIcon from "@/components/svg/search.svg";

const Search = ({
  placeholder,
  className,
  setSearch,
  search,
  handleSearch,
}: {
  placeholder: string;
  className?: string;
  search: string;
  setSearch: (search: string) => void;
  handleSearch: () => void;
}) => {
  return (
    <div className={cn(styles.wrapper, className)}>
      <div className={styles.searchIcon}>
        <SearchIcon />
      </div>
      <Input
        type="text"
        placeholder={`جست‌وجو در ${placeholder}`}
        className={styles.input}
        onChange={(event) => setSearch(event.target.value)}
        value={search}
        onBlur={handleSearch}
      />
    </div>
  );
};

export default Search;
