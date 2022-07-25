import { Dispatch, SetStateAction } from 'react';
import './input.css';

interface Input {
  setSearchStr: Dispatch<SetStateAction<string | undefined>>;
}

const Input = ({ setSearchStr }: Input) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchStr(event.target.value);
  return (
    <input
      className="search"
      placeholder="Search images..."
      onChange={handleChange}
    ></input>
  );
};

export default Input;
