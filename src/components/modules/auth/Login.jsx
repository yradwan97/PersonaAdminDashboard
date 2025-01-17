import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import {
  Box, Button, Flex,
  FormControl,
  FormLabel,
  Heading,
  Input, Stack,
  Link as ChakraLink,
  Text,
  Image,
  Divider,
  useToast,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';

import * as FiIcons from 'react-icons/fi';

import theme from '../../global/theme';

import { login } from '../../../store/auth/authSlice';

import { AuthWarpper } from './AuthStyle';

import brandImage from '../../../assets/images/logo.png';

import authBg from '../../../assets/images/auth-bg.jpg';

const Login = () => {
  const { t } = useTranslation();
  const toast = useToast({ position: 'top', duration: 2000, status: 'error' });
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      role: "admin"
    }
  });

  const [isPasswordShown, setIsPasswordShown] = useState(false);

  return (
    <AuthWarpper>
      <Flex background={`url(${authBg}) no-repeat`} backgroundSize="cover" minH="100vh" justifyContent="center" alignItems="center">
        <Box bg={theme.dark} p={8} className="auth-box" borderRadius={10}>

          <Box textAlign="center">
            <Image m="auto" h="80px" src={brandImage} mb={4} />

            <Heading
              color={theme.light} fontSize={28} textTransform="capitalize" mb={4}
            >
              {t('pages.auth.welcome_1')}
            </Heading>

            <Heading
              color={theme.text} fontSize={14} textTransform="capitalize"
            >
              {t('pages.auth.welcome_2')}
            </Heading>
          </Box>
          0
          <Divider borderColor={theme.border} marginBlock={6} />

          <form onSubmit={handleSubmit(values => {
            dispatch(login(values))
              .unwrap()
              .then(_ => {
                navigate('/');
              }).catch(e => {
                toast({ description: e.message });
              })
          })}>
            <Stack spacing={4}>

              <FormControl>
                <FormLabel
                  color={theme.light} textTransform="capitalize"
                >
                  {t('pages.auth.email')}
                </FormLabel>
                <Input
                  type="text" placeholder={t('pages.auth.email')}
                  border="none" color={theme.dark} bg={theme.bg}
                  _placeholder={{ color: theme.text }} paddingInline={4}
                  {...register('email', {
                    required: `${t('validation.required')}`
                  })}
                />
                {errors.email?.message && (
                  <Text color={theme.error}>{errors.email?.message}</Text>
                )}
              </FormControl>

              <FormControl>
                <FormLabel
                  color={theme.light} textTransform="capitalize"
                >
                  {t('pages.auth.password')}
                </FormLabel>
                <InputGroup>
                  <Input
                    type={isPasswordShown ? 'text' : 'password'} placeholder={t('pages.auth.password')}
                    border="none" color={theme.dark} bg={theme.bg} autoComplete="false"
                    _placeholder={{ color: theme.text }} paddingInline={4}
                    {...register('password', {
                      required: `${t('validation.required')}`,
                      minLength: {
                        value: 6,
                        message: `${t('validation.min_length')} 6`
                      }
                    })}
                  />
                  <InputRightElement>
                    <Button p={0} bg="none" color={theme.dark} _hover={{ bg: "none" }}
                      type="button" onClick={() => setIsPasswordShown(!isPasswordShown)}
                    >
                      {isPasswordShown ? <FiIcons.FiEyeOff /> : <FiIcons.FiEye />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password?.message && (
                  <Text color={theme.error}>{errors.password?.message}</Text>
                )}
              </FormControl>

              <ChakraLink
                as={Link} to="#!"
                textTransform="capitalize"
              >
                <Flex>
                  <Text color={theme.light}>{t('pages.auth.forget_password')}</Text>
                  <Text ms={2} color={theme.blue}>{t('pages.auth.reset')}</Text>
                </Flex>
              </ChakraLink>

              <Button
                type="submit" textTransform="capitalize"
                bg={theme.blue} color={theme.light}
                _hover={{ bg: theme.blue }}
                isLoading={auth.isLoading}
              >
                {t('pages.auth.login')}
              </Button>
            </Stack>
          </form>
        </Box>
      </Flex>
    </AuthWarpper>
  )
}

export default Login