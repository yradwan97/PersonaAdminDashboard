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
import { getHomeOffer, updateHomeOffer } from "src/store/settings/home/homeOfferSlice";
import React, { useEffect } from "react";

const Offer = () => {
  const { t } = useTranslation();
  const toast = useToast({ position: "top", status: "success", duration: 3000 });
  const dispatch = useDispatch();
  const homeOffer = useSelector(state => state.homeOffer);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm();

  watch(["background"]);

  useEffect(() => {
    dispatch(getHomeOffer())
      .unwrap()
      .then(res => {
        reset(res.data)
      })
      .catch(e => console.log(e))
  }, [dispatch, reset]);

  return (
    <form onSubmit={handleSubmit((values, even) => {
      dispatch(updateHomeOffer(values))
        .unwrap()
        .then(_ => {
          toast({ description: "settings updated" });
        })
        .catch(e => {
          window.scrollTo(0, 0);
        })
    })}>
      <Stack spacing={6}>
        {homeOffer?.error && (
          <Alert status="error" variant="left-accent">
            <AlertIcon />
            <Text>{homeOffer?.error || "-"}</Text>
          </Alert>
        )}

        <FormControl>
          <FormLabel textTransform="capitalize">
            {t("pages.settings.home.offer.title_ar")}
          </FormLabel>
          <Input
            type="text" placeholder={t("pages.settings.home.offer.title_ar")}
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
            {t("pages.settings.home.offer.title_en")}
          </FormLabel>
          <Input
            type="text" placeholder={t("pages.settings.home.offer.title_en")}
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
            {t("pages.settings.home.offer.subtitle_ar")}
          </FormLabel>
          <Input
            type="text" placeholder={t("pages.settings.home.offer.subtitle_ar")}
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
            {t("pages.settings.home.offer.subtitle_en")}
          </FormLabel>
          <Input
            type="text" placeholder={t("pages.settings.home.offer.subtitle_en")}
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
            {t("pages.settings.home.offer.date")}
          </FormLabel>
          <Input
            type="date" placeholder={t("pages.settings.home.offer.date")}
            height="48px" borderRadius={4}
            {...register("date", {
              required: t("validation.required")
            })}
          />
          {errors.date && (
            <FormHelperText color="red.600">{errors.date.message}</FormHelperText>
          )}
        </FormControl>

        <Button
          type="submit"
          bg="green.600"
          isLoading={homeOffer.isLoading}
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

export default Offer