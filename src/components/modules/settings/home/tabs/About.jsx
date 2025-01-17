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
} from "@chakra-ui/react";
import { getHomeAbout, updateHomeAbout } from "src/store/settings/home/homeAboutSlice";
import React, { useEffect } from "react";

const About = () => {
  const { t } = useTranslation();
  const toast = useToast({ position: "top", status: "success", duration: 3000 });
  const dispatch = useDispatch();
  const homeAbout = useSelector(state => state.homeAbout);

  console.log(homeAbout);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm();

  watch(["image"]);

  useEffect(() => {
    dispatch(getHomeAbout())
      .unwrap()
      .then(res => {
        reset(res.data)
      })
      .catch(e => console.log(e))
  }, [dispatch, reset]);

  return (
    <form onSubmit={handleSubmit((values, even) => {
      dispatch(updateHomeAbout(values))
        .unwrap()
        .then(_ => {
          toast({ description: "settings updated" });
        })
        .catch(e => {
          window.scrollTo(0, 0);
        })
    })}>
      <Stack spacing={6}>
        {homeAbout?.error && (
          <Alert status="error" variant="left-accent">
            <AlertIcon />
            <Text>{homeAbout?.error || "-"}</Text>
          </Alert>
        )}

        <FormControl>
          <FormLabel textTransform="capitalize">
            {t("pages.settings.home.about.title_ar")}
          </FormLabel>
          <Input
            type="text" placeholder={t("pages.settings.home.about.title_ar")}
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
            {t("pages.settings.home.about.title_en")}
          </FormLabel>
          <Input
            type="text" placeholder={t("pages.settings.home.about.title_en")}
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
            {t("pages.settings.home.about.description_ar")}
          </FormLabel>
          <Input
            type="text" placeholder={t("pages.settings.home.about.description_ar")}
            height="48px" borderRadius={4}
            {...register("description_ar", {
              required: t("validation.required")
            })}
          />
          {errors.description_ar && (
            <FormHelperText color="red.600">{errors.description_ar.message}</FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <FormLabel textTransform="capitalize">
            {t("pages.settings.home.about.description_en")}
          </FormLabel>
          <Input
            type="text" placeholder={t("pages.settings.home.about.description_en")}
            height="48px" borderRadius={4}
            {...register("description_en", {
              required: t("validation.required")
            })}
          />
          {errors.description_en && (
            <FormHelperText color="red.600">{errors.description_en.message}</FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <FormLabel textTransform="capitalize">
            {t("pages.settings.home.about.description2_ar")}
          </FormLabel>
          <Input
            type="text" placeholder={t("pages.settings.home.about.description2_ar")}
            height="48px" borderRadius={4}
            {...register("description2_ar", {
              required: t("validation.required")
            })}
          />
          {errors.description2_ar && (
            <FormHelperText color="red.600">{errors.description2_ar.message}</FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <FormLabel textTransform="capitalize">
            {t("pages.settings.home.about.description2_en")}
          </FormLabel>
          <Input
            type="text" placeholder={t("pages.settings.home.about.description2_en")}
            height="48px" borderRadius={4}
            {...register("description2_en", {
              required: t("validation.required")
            })}
          />
          {errors.description2_en && (
            <FormHelperText color="red.600">{errors.description2_en.message}</FormHelperText>
          )}
        </FormControl>

        <Button
          type="submit"
          bg="green.600"
          isLoading={homeAbout.isLoading}
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

export default About