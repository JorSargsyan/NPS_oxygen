import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Am from "assets/icons/am.svg";
import Ru from "assets/icons/ru.svg";
import En from "assets/icons/gb.svg";
import { ELanguageIds } from "store/enums/translations.enum";
import { Skeleton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { LStorage } from "store/config/constants";
import { GetTranslationsByLangId } from "store/slicers/translations";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { ERequestStatus } from "store/enums/index.enum";

interface ILanguage {
  icon: any;
  label: string;
  value: number;
}

const languagesList: ILanguage[] = [
  {
    icon: Am,
    value: ELanguageIds.Armenian,
    label: "Arm",
  },
  {
    icon: Ru,
    value: ELanguageIds.Russian,
    label: "Rus",
  },
  {
    icon: En,
    value: ELanguageIds.English,
    label: "Eng",
  },
];

const LanguageMenu = () => {
  const dispatch = useAsyncDispatch();
  const [selectedLanguage, setSelectedLanguage] = useState<ILanguage | null>(
    null
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectLanguage = async (value: number) => {
    if (value) {
      localStorage.setItem(LStorage.LANG, value.toString());
      const selectedLang = languagesList.find((item) => item.value === value);
      setSelectedLanguage(selectedLang);
      const { meta } = await dispatch(GetTranslationsByLangId(value));
      if (meta.requestStatus !== ERequestStatus.FULFILLED) {
        return;
      }
    }
    setAnchorEl(null);
  };

  useEffect(() => {
    const currentLang = localStorage.getItem(LStorage.LANG);
    if (currentLang) {
      const selectedLang = languagesList.find(
        (item) => item.value === Number(currentLang)
      );
      setSelectedLanguage(selectedLang);
    } else {
      localStorage.setItem(LStorage.LANG, languagesList[0].value.toString());
      setSelectedLanguage(languagesList[0]);
    }
  }, []);

  return (
    <div>
      {selectedLanguage?.value ? (
        <Button
          id="fade-button"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <Box display="flex" height="20px" margin="5px 0">
            <Typography fontSize={14}>{selectedLanguage.label}</Typography>
          </Box>
        </Button>
      ) : (
        <Skeleton animation="wave" width={33} height={50} />
      )}

      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          "& .MuiPaper-root": {
            "& .MuiList-root": {
              padding: "8px 8px",
              "& .MuiButtonBase-root": {
                padding: "2px 8px",
                borderRadius: "5px",
              },
            },
          },
        }}
      >
        {languagesList.map((item) => {
          return (
            <MenuItem
              key={item.value}
              selected={item.value === selectedLanguage?.value}
              onClick={(e) => {
                handleSelectLanguage(item.value);
              }}
            >
              <Box
                display="flex"
                width={100}
                alignItems={"center"}
                height="15px"
                margin="5px 0"
              >
                <Typography> {item.label}</Typography>
              </Box>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default LanguageMenu;
