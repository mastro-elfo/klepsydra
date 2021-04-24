import { useEffect, useState } from "react";
import { Button, MobileStepper, Paper, Typography } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { Content } from "mastro-elfo-mui";
import { useSettings } from "./settings/context";

const FullPage = styled(Paper)(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  background: theme.palette.primary.main,
  color: theme.palette.getContrastText(theme.palette.primary.main),
}));

export default function Intro({ children }) {
  const [step, setStep] = useState(0);
  const [settings, setSettings] = useSettings();
  const { intro } = settings;

  useEffect(() => {
    setStep(0);
  }, [intro]);

  const TUTORIAL = [
    {
      title: "Introduzione",
      content: ["Klepsýdra"],
    },
    {
      title: "Iniziamo!",
      content: [
        "Puoi rivedere questo tutorial dalla pagina Impostazioni",
        "Clicca Fine per iniziare a tracciare",
      ],
    },
  ];

  const handleNext = () => {
    if (step < TUTORIAL.length - 1) {
      setStep(step + 1);
    } else {
      setSettings({ ...settings, intro: false });
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  if (intro) {
    return (
      <FullPage square elevation={0}>
        <Content>
          <Typography variant="h1">{TUTORIAL[step].title}</Typography>

          {TUTORIAL[step].content.map((p, i) => (
            <Typography key={i} paragraph>
              {p}
            </Typography>
          ))}

          <MobileStepper
            steps={TUTORIAL.length}
            activeStep={step}
            nextButton={
              <Button size="small" onClick={handleNext}>
                {step < TUTORIAL.length - 1 ? "Succ." : "Fine"}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={step === 0}>
                Prec.
              </Button>
            }
          />
        </Content>
      </FullPage>
    );
    // setSettings({...settings, intro: false})
  }
  return children;
}
