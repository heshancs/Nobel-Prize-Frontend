import { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
} from "@mui/material";
interface FilterProps {
  onFilterChange: (filters: {
    gender: string;
    birthYear: string;
    deathYear: string;
    nobelPrizeCategory: string;
  }) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [gender, setGender] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [deathYear, setDeathYear] = useState("");
  const [category, setCategory] = useState("");

  const handleFilterChange = () => {
    onFilterChange({ gender, birthYear, deathYear, nobelPrizeCategory: category });
  };

  return (
    <Box display="flex" flexDirection="row" gap={2} p={2} alignItems="center">
      <FormControl style={{ minWidth: 120 }}>
        <InputLabel>Gender</InputLabel>
        <Select
          value={gender}
          onChange={(e) => setGender(e.target.value as string)}
          label="Gender"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Birth Year"
        type="number"
        value={birthYear}
        onChange={(e) => setBirthYear(e.target.value)}
        style={{ minWidth: 120 }}
      />

      <TextField
        label="Death Year"
        type="number"
        value={deathYear}
        onChange={(e) => setDeathYear(e.target.value)}
        style={{ minWidth: 120 }}
      />

      <FormControl style={{ minWidth: 120 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value as string)}
          label="Category"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="che">Chemistry</MenuItem>
          <MenuItem value="eco">Economics</MenuItem>
          <MenuItem value="lit">Literature</MenuItem>
          <MenuItem value="pea">Peace</MenuItem>
          <MenuItem value="phy">Physics</MenuItem>
          <MenuItem value="med">Medicine</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={handleFilterChange}>
        Apply Filters
      </Button>
    </Box>
  );
};

export default Filter;
