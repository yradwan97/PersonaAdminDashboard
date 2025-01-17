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
import { getGlobalConfig, updateGlobalConfig } from "src/store/settings/global/globalConfigSlice";
import React, { useEffect } from "react";
import { baseUrl } from "src/utilities/axios";

const Config = () => {
  const { t } = useTranslation();
  const toast = useToast({ position: "top", status: "success", duration: 3000 });
  const dispatch = useDispatch();
  const globalConfig = useSelector(state => state.globalConfig);

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
    watch,
    setValue
  } = useForm();

  watch(["logo"]);

  useEffect(() => {
    dispatch(getGlobalConfig())
      .unwrap()
      .then(res => {
        reset(res.data)
      })
      .catch(e => console.log(e))
  }, [dispatch, reset]);

  return (
    <form onSubmit={handleSubmit((values, even) => {
      dispatch(updateGlobalConfig(even.target))
        .unwrap()
        .then(_ => {
          toast({ description: "settings updated" });
        })
        .catch(e => {
          window.scrollTo(0, 0);
        })
    })}>
      <Stack spacing={6}>
        {globalConfig?.error && (
          <Alert status="error" variant="left-accent">
            <AlertIcon />
            <Text>{globalConfig?.error || "-"}</Text>
          </Alert>
        )}

        <FormControl>
          <FormLabel textTransform="capitalize">
            {t("pages.settings.global.config.email")}
          </FormLabel>
          <Input
            type="text" placeholder={t("pages.settings.global.config.email")}
            height="48px" borderRadius={4}
            {...register("email", {
              required: t("validation.required")
            })}
          />
          {errors.email && (
            <FormHelperText color="red.600">{errors.email.message}</FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <FormLabel textTransform="capitalize">
            {t("pages.settings.global.config.phone")}
          </FormLabel>
          <Input
            type="text" placeholder={t("pages.settings.global.config.phone")}
            height="48px" borderRadius={4}
            {...register("phone", {
              required: t("validation.required")
            })}
          />
          {errors.phone && (
            <FormHelperText color="red.600">{errors.phone.message}</FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <FormLabel textTransform="capitalize">
            {t("pages.settings.global.config.phone2")}
          </FormLabel>
          <Input
            type="text" placeholder={t("pages.settings.global.config.phone2")}
            height="48px" borderRadius={4}
            {...register("phone2", {
              required: t("validation.required")
            })}
          />
          {errors.phone2 && (
            <FormHelperText color="red.600">{errors.phone2.message}</FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <FormLabel textTransform="capitalize">
            {t("pages.settings.global.config.location")}
          </FormLabel>
          <Input
            type="text" placeholder={t("pages.settings.global.config.location")}
            height="48px" borderRadius={4}
            {...register("location", {
              required: t("validation.required")
            })}
          />
          {errors.location && (
            <FormHelperText color="red.600">{errors.location.message}</FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <FormLabel textTransform="capitalize">
            {t("pages.settings.global.config.facebook")}
          </FormLabel>
          <Input
            type="text" placeholder={t("pages.settings.global.config.facebook")}
            height="48px" borderRadius={4}
            {...register("facebook", {
              required: t("validation.required")
            })}
          />
          {errors.facebook && (
            <FormHelperText color="red.600">{errors.facebook.message}</FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <FormLabel textTransform="capitalize">
            {t("pages.settings.global.config.youtube")}
          </FormLabel>
          <Input
            type="text" placeholder={t("pages.settings.global.config.youtube")}
            height="48px" borderRadius={4}
            {...register("youtube", {
              required: t("validation.required")
            })}
          />
          {errors.youtube && (
            <FormHelperText color="red.600">{errors.youtube.message}</FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <FormLabel textTransform="capitalize">
            {t("pages.settings.global.config.logo")}
          </FormLabel>
          <Input
            type="file" placeholder={t("pages.settings.global.config.logo")}
            height="48px" borderRadius={4} pt={2}
            {...register("logo")}
          />
          {typeof (getValues("logo")) === "string" && getValues("logo") && (
            <>
              <input type="hidden" name="edited_logo" value={getValues("logo")} />
              <Image mt={2} src={`${baseUrl}/config/${getValues("logo")}`} height="150px" objectFit="contain" />
              <Button mt={2} bg="red.600" color="white" type="button" onClick={() => setValue("logo", null)}>
                {t("general.delete")}
              </Button>
            </>
          )}
        </FormControl>

        <Button
          type="submit"
          bg="green.600"
          isLoading={globalConfig.isLoading}
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

export default Config