import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useOutsideClick } from "@/hooks/useOutSideClick";
import styles from "./DropDown.module.scss";
import TickIcon from "@/assets/svg/tickIcon";
import ChevronIcon from "@/assets/svg/chevron";

type Options = {
  label: string;
  icon?: string;
};

interface DropDownProps {
  options: Options[];
}

function DropDown(props: DropDownProps) {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([...props.options]);
  const [showOptions, setShowOptions] = useState(true);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const ref = useOutsideClick(() => {
    setShowOptions(false);
  });

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setValue(value);
  };

  const onselectOption = (item: Options) => {
    if (selectedItems.includes(item.label))
      return setSelectedItems(
        selectedItems.filter((_item) => _item != item.label)
      );

    setSelectedItems([...selectedItems, item.label]);
    setValue("");
  };

  const createNewOption = () => {
    const newOption = { label: value };

    const isDuplicate = options.find(
      (_item) => _item.label === newOption.label
    );

    if (!isDuplicate) {
      setOptions([newOption, ...options]);
      onselectOption({ label: value });
    }
  };

  const renderDropDownOptions = () => {
    return options.map((item) => {
      return (
        <div
          className={`${styles.options} ${
            selectedItems.includes(item.label) ? styles.selected : ""
          }`}
          onClick={() => onselectOption(item)}
        >
          <div>
            <span>
              {item.label.length > 60
                ? `${item.label.substring(0, 60)}...`
                : item.label}
            </span>
            {item.icon && <img src={item.icon} alt={item.label} />}
          </div>
          {selectedItems.includes(item.label) && <TickIcon />}
        </div>
      );
    });
  };

  const onkeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      createNewOption();
    }
  };

  return (
    <div className={styles.container} ref={ref}>
      <input
        type="text"
        value={value}
        onChange={onChangeInput}
        onKeyDown={onkeydown}
        onClick={() => setShowOptions(true)}
      />
      <div className={`${styles.icon} ${showOptions && styles.rotate}`}>
        <ChevronIcon />
      </div>
      {showOptions && (
        <div className={styles.list}>{renderDropDownOptions()}</div>
      )}
    </div>
  );
}

export default DropDown;
