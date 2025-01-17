import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Alert,
  AlertIcon,
  Text,
  useToast,
  Image,
} from "@chakra-ui/react";
import { getHomeAdvice, updateHomeAdvice } from "src/store/settings/home/homeAdviceSlice";
import React, { useEffect } from "react";
import { baseUrl } from "src/utilities/axios";

const Advice = () => {
  const { t } = useTranslation();
  const toast = useToast({ position: "top", status: "success", duration: 3000 });
  const dispatch = useDispatch();
  const homeAdvice = useSelector(state => state.homeAdvice);

  console.log(homeAdvice);

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
    watch,
    setValue
  } = useForm();

  watch(["background"]);

  useEffect(() => {
    dispatch(getHomeAdvice())
      .unwrap()
      .then(res => {
        reset(res.data)
      })
      .catch(e => console.log(e))
  }, [dispatch, reset]);

  return (
    <form onSubmit={handleSubmit((values, even) => {
      dispatch(updateHomeAdvice(even.target))
        .unwrap()
        .then(_ => {
          toast({ description: "settings updated" });
        })
        .catch(e => {
          window.scrollTo(0, 0);
        })
    })}>
      <Stack spacing={6}>
        {homeAdvice?.error && (
          <Alert status="error" variant="left-accent">
            <AlertIcon />
            <Text>{homeAdvice?.error || "-"}</Text>
          </Alert>
        )}

        <FormControl>
          <FormLabel textTransform="capitalize">
            {t("pages.settings.home.advice.title_ar")}
          </FormLabel>
          <Input
            type="text" placeholder={t("pages.settings.home.advice.title_ar")}
            height="48px" borderRadius={4}
            {...register("title_ar", {
              required: t("validation.required")
            })}
          />
          {errors.title_ar && (
            <FormHelperText color="red.600">{errors.title_ar.message}</FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <FormLabel textTransform="capitalize">
            {t("pages.settings.home.advice.title_en")}
          </FormLabel>
          <Input
            type="text" placeholder={t("pages.settings.home.advice.title_en")}
            height="48px" borderRadius={4}
            {...register("title_en", {
              required: t("validation.required")
            })}
          />
          {errors.title_en && (
            <FormHelperText color="red.600">{errors.title_en.message}</FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <FormLabel textTransform="capitalize">
            {t("pages.settings.home.advice.subtitle_ar")}
          </FormLabel>
          <Input
            type="text" placeholder={t("pages.settings.home.advice.subtitle_ar")}
            height="48px" borderRadius={4}
            {...register("subtitle_ar", {
              required: t("validation.required")
            })}
          />
          {errors.subtitle_ar && (
            <FormHelperText color="red.600">{errors.subtitle_ar.message}</FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <FormLabel textTransform="capitalize">
            {t("pages.settings.home.advice.subtitle_en")}
          </FormLabel>
          <Input
            type="text" placeholder={t("pages.settings.home.advice.subtitle_en")}
            height="48px" borderRadius={4}
            {...register("subtitle_en", {
              required: t("validation.required")
            })}
          />
          {errors.subtitle_en && (
            <FormHelperText color="red.600">{errors.subtitle_en.message}</FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <FormLabel textTransform="capitalize">
            {t("pages.settings.home.advice.background")}
          </FormLabel>
          <Input
            type="file" placeholder={t("pages.settings.home.advice.background")}
            height="48px" borderRadius={4} pt={2}
            {...register("background")}
          />
          {typeof (getValues("background")) === "string" && getValues("background") && (
            <>
              <input type="hidden" name="edited_background" value={getValues("background")} />
              <Image mt={2} src={`${baseUrl}/advice/${getValues("background")}`} height="150px" objectFit="contain" />
              <Button mt={2} bg="red.600" color="white" type="button" onClick={() => setValue("background", null)}>
                {t("general.delete")}
              </Button>
            </>
          )}
        </FormControl>

        <Button
          type="submit"
          bg="green.600"
          isLoading={homeAdvice.isLoading}
          color="white"
          textTransform="capitalize"
          _hover={{ bg: "green.600" }}
        >
          {t("general.save")}
        </Button>
      </Stack>
    </form>
  )
}

export default Advice