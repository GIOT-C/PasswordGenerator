import styles from "./PasswordGenerator.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface Options {
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  symbol: boolean;
}

function PasswordGeneratorComponent() {
  const [range, setRange] = useState<number>(20);
  const [password, setPassword] = useState<string>("");
  const [copyPassword, setCopyPassword] = useState<boolean>(false);
  const [options, setOptions] = useState<Options>({
    uppercase: true,
    lowercase: false,
    number: false,
    symbol: false,
  });

  const handleCheckboxChange = (option: keyof Options) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [option]: !prevOptions[option],
    }));
  };

  const calculateStrengthLevel = () => {
    const activeCheckboxes = Object.values(options).filter(Boolean).length;
    return activeCheckboxes;
  };

  const calculateStrengthLevelDescription = () => {
    const activeCheckboxes = Object.values(options).filter(Boolean).length;
    if (activeCheckboxes === 1) {
      return "TOO WEAK";
    } else if (activeCheckboxes === 2) {
      return "WEAK";
    } else if (activeCheckboxes === 3) {
      return "MEDIUM";
    } else if (activeCheckboxes === 4) {
      return "STRONG";
    }
    return "";
  };

  const getStrengthLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return styles["level-1"];
      case 2:
        return styles["level-2"];
      case 3:
        return styles["level-3"];
      case 4:
        return styles["level-4"];
      default:
        return "";
    }
  };

  const generatePassword = (length: number) => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+[]{},.<>?|;:";

    let charPool = "";
    if (options.uppercase) charPool += uppercaseChars;
    if (options.lowercase) charPool += lowercaseChars;
    if (options.number) charPool += numberChars;
    if (options.symbol) charPool += symbolChars;

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length);
      newPassword += charPool.charAt(randomIndex);
    }

    setPassword(newPassword);
    setCopyPassword(false);
  };

  const handleCopyClick = () => {
    const textarea = document.createElement("textarea");
    textarea.value = password;

    document.body.appendChild(textarea);

    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile devices

    document.execCommand("copy");

    document.body.removeChild(textarea);
    setCopyPassword(true);
  };

  return (
    <div className={styles.parent}>
      <div className={styles.mainContainer}>
        <h3>Password Generator</h3>
        <div className={styles.generatingPassword}>
          <h3 className={copyPassword ? styles.copiedPassword : ""}>
            {" "}
            {password}
          </h3>

          <div className={styles.copyContainer}>
            {copyPassword ? <span>COPIED</span> : ""}
            <FontAwesomeIcon
              icon={faCopy}
              className={styles.copyIcon}
              onClick={handleCopyClick}
              aria-label="Copy Password"
            />
          </div>
        </div>

        <div className={styles.passwordGenerator}>
          <div className={styles.characterLength}>
            <p>Character Length</p>
            <h2>{range}</h2>
          </div>

          <input
            type="range"
            id="length"
            name="length"
            min={8}
            max={20}
            onChange={(e) => setRange(e.target.valueAsNumber)}
          />

          <div>
            <div className={styles.checkBoxContainer}>
              <input
                type="checkbox"
                name="strength"
                id="uppercase"
                checked={options.uppercase}
                onChange={() => handleCheckboxChange("uppercase")}
                aria-label="Include Uppercase Letters"
              />
              <label htmlFor="uppercase">Include Uppercase Letters</label>
            </div>

            <div className={styles.checkBoxContainer}>
              <input
                type="checkbox"
                name="strength"
                id="lowercase"
                checked={options.lowercase}
                onChange={() => handleCheckboxChange("lowercase")}
                aria-label="Include Lowercase Letters"
              />
              <label htmlFor="lowercase">Include Lowercase Letters</label>
            </div>

            <div className={styles.checkBoxContainer}>
              <input
                type="checkbox"
                name="strength"
                id="number"
                checked={options.number}
                onChange={() => handleCheckboxChange("number")}
                aria-label="Include Numbers"
              />
              <label htmlFor="number">Include Numbers</label>
            </div>

            <div className={styles.checkBoxContainer}>
              <input
                type="checkbox"
                name="strength"
                id="symbol"
                checked={options.symbol}
                onChange={() => handleCheckboxChange("symbol")}
                aria-label="Include Symbols"
              />
              <label htmlFor="symbol">Include Symbols</label>
            </div>
          </div>

          <div className={styles.strenghtContainer}>
            <p>STRENGTH</p>

            <div className={styles.strenght}>
              <p>{calculateStrengthLevelDescription()}</p>

              {[1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`${styles.strengthLevel} ${
                    level <= calculateStrengthLevel()
                      ? getStrengthLevelColor(level)
                      : ""
                  }`}
                ></div>
              ))}
            </div>
          </div>

          <button
            className={styles.generateButton}
            onClick={() => generatePassword(range)}
          >
            GENERATE
            <FontAwesomeIcon
              icon={faArrowRight}
              className={styles.faArrowRight}
              aria-label="Generate Password"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PasswordGeneratorComponent;
