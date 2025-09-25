import axios, { AxiosError } from 'axios';
import { FormikProps } from "formik";
import moment from 'moment';
import numeral from 'numeral';
import { Converter } from "showdown";
import * as Yup from "yup";
import request from "../axios";
import { DEFAULT_MESSAGE_ERROR_500 } from '../constants';
import { SocketCustom } from '../context/SocketContext';
import { swalToast } from "../swal-notification";
import { ErrorResponse } from '../types/common';
import { CompanyType, UserRole, UserTitle } from '../types/enum';
import { allowedExtensions, allowedTypes, countriesList } from "./global-config";
import { convertFileToBase64 } from "./site";

export function getFullName(info?: { [key: string]: any }) {
  return [info?.first_name, info?.last_name].filter(Boolean).join(' ')
}

export function formatMsgError(error: any) {
  const err = error as AxiosError<ErrorResponse>

  if (axios.isAxiosError(err)) {
    const message = err?.response?.data?.message || err.message || DEFAULT_MESSAGE_ERROR_500
    return message
  } else {
    return typeof (err as any)?.message === 'string'
      ? (err as any)?.message
      : DEFAULT_MESSAGE_ERROR_500
  }
}

export function isDateInRange(startDateStr: string) {
  const startDate = moment(startDateStr, 'DD/MM/YYYY').subtract(1, 'days')
  const endDate = startDate.clone().add(31, 'days')
  const checkDate = moment()

  return checkDate.isBetween(startDate, endDate, 'day', '[]')
}

export function isJson(str: string) {
  try {
    JSON.parse(str)
    return true
  } catch (e) {
    return false
  }
}

export function parseJson(str: string) {
  try {
    return JSON.parse(str)
  } catch (error) { }
}

export const formatNumber = (number: number): string => {
  return number.toLocaleString('en-US');
};

export const openInNewTab = (url: string): void => {
  if (url.includes('http') || url.includes('https')) {
    window.open(url, '_blank');
  } else {
    window.open(`https://${url}`, '_blank');
  }
};

export function hashEmail(email: string) {
  const [name, domain] = email.split('@');

  const visibleChars = 2;
  let hashedName;

  if (name.length > visibleChars) {
    hashedName =
      name.slice(0, visibleChars) + '*'.repeat(name.length - visibleChars);
  } else if (name.length > 0) {
    hashedName = '*'.repeat(name.length);
  } else {
    hashedName = '';
  }

  return `${hashedName}@${domain}`;
}

export function hashPhoneNumber(phoneNumber: string) {
  const visibleChars = 4;

  let hashedPhoneNumber;

  if (phoneNumber.length > visibleChars) {
    hashedPhoneNumber =
      '*'.repeat(phoneNumber.length - visibleChars) + phoneNumber.slice(-visibleChars);
  } else if (phoneNumber.length > 0) {
    hashedPhoneNumber = '*'.repeat(phoneNumber.length);
  } else {
    hashedPhoneNumber = '';
  }

  return hashedPhoneNumber;
}

export function convertFieldMaximum(maxChar: number, isNumber?: boolean) {
  return `Maximum ${maxChar}` + (isNumber ? ' for this field' : ' symbols')
}

export function convertFieldRequired(fieldLabel?: string) {
  return `${fieldLabel ? fieldLabel : 'This field'} is required`
}

export function convertFieldPassword(label: string) {
  return `${label} must be at least 8 characters including at least one letter, one number, and one special character`
}

export function filterObjectKeyNotEmpty(
  object: { [key: string]: any },
  recurse: boolean = false
): { [key: string]: any } {
  const keys = Object.keys(object);

  return keys
    .filter((key) => {
      const value = object[key];
      return !!value; // Filters out falsy values
    })
    .reduce<{ [key: string]: any }>((acc, key) => {
      const value = object[key];
      if (isObject(value) && recurse) {
        acc[key] = filterObjectKeyNotEmpty(value, recurse);
      } else {
        acc[key] = value;
      }
      return acc;
    }, {}); // Explicitly type the accumulator
}

export function convertSize(sizeInBytes: number) {
  const KB = 1024
  const MB = KB ** 2
  if (+sizeInBytes < MB) {
    return (+sizeInBytes / KB).toFixed(2) + ' KB'
  } else {
    return (+sizeInBytes / MB).toFixed(2) + ' MB'
  }
}

export function isObject(value: any) {
  if (typeof value === 'object' && !Number.isNaN(value) && !Array.isArray(value)) {
    return true
  } else {
    return false
  }
}

export function capitalizeFirstText(text: string) {
  if (!text || typeof text !== 'string') return ''

  return text
    .split(' ')
    .filter(Boolean)
    .map((text) => `${text.charAt(0).toUpperCase()}${text.slice(1).toLowerCase()}`)
    .join(' ')
}

export const getUserRole = (role: string) => {
  switch (role) {
    case UserRole.ADMIN:
      return 'Admin';
    case UserRole.CUSTOMER:
      return 'User';
    default:
      return 'Unknown';
  }
}

export const getCompanyTypeValue = (type: number): string => {
  switch (type) {
    case CompanyType.System:
      return 'System';
    case CompanyType.AccountingServiceProvider:
      return 'Accounting Service Provider';
    case CompanyType.CompanyWithFinance:
      return 'Company With Finance';
    case CompanyType.StartupOrSmallCompany:
      return 'Startup Or Small Company';
    default:
      return 'Unknown';
  }
}

export const getApplicationStatusValue = (status: number): string => {
  switch (status) {
    case 0:
      return 'Pending';
    case 1:
      return 'Approved';
    case 2:
      return 'Rejected';
    default:
      return 'Unknown';
  }
};

export const getUserStatusValue = (status: number): string => {
  switch (status) {
    case 0:
      return 'Inactive';
    case 1:
      return 'Active';
    default:
      return 'Unknown';
  }
}

export async function convertFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      resolve(reader.result as string)
    }
    reader.onerror = reject
  })
}

export function countWords(str: string) {
  const textWithoutTags = str?.replace(/<[^>]+>/g, '');

  // Replace HTML entities with space (optional, adjust as needed)
  const textWithoutEntities = textWithoutTags?.replace(/&[^;]+;/g, ' ');

  // Remove extra whitespace and trim
  const cleanText = textWithoutEntities?.replace(/\s+/g, ' ').trim();

  return cleanText ? cleanText.split(/\s+/).length : 0;
}

export function formatMoney(
  value: number,
  returnWhenZero: any = '$0.00',
  returnWhenNotANumber: any = '$0.00'
): string {
  let newValue = +value

  if (!newValue && newValue !== 0) {
    return returnWhenNotANumber
  }

  if (newValue === 0) {
    return returnWhenZero
  }

  return numeral(newValue).format(`$0,0.00`)
}

export const Sum = (key: string, data = [], format = true) => {
  const total = data.reduce((sum, loan) => {
    return sum + Number(loan[key] || 0)
  }, 0)
  return format ? formatMoney(total) : total
}

export function getAbbreviation(name: string) {
  const words = name.split(' ')
  let abbreviation = ''

  words.forEach((word) => {
    abbreviation += word.charAt(0).toUpperCase()
  })

  return abbreviation
}

export const capitalizeFirstLetter = (str: string) => {
  return str?.toLowerCase().split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

export function deleteAllCookies() {
  {
    const cookies = document.cookie.split(';')

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i]
      const eqPos = cookie.indexOf('=')
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
  }
}

export function formatMoneyWithoutIcon(
  value: number,
  returnWhenZero: any = '0.00',
  returnWhenNotANumber: any = '0.00'
): string {
  let newValue = +value

  if (!newValue && newValue !== 0) {
    return returnWhenNotANumber
  }

  if (newValue === 0) {
    return returnWhenZero
  }

  return numeral(newValue).format(`0,0`)
}

export function handleDisconnectSocket(
  socket: SocketCustom,
  infoUser: {
    userId: number
  }
) {
  socket?.emit('logout', infoUser)
  socket?.disconnect()
}

export function removeBase64Header(encodedString: string) {
  return encodedString.replace(/^data:.*?;base64,/, '')
}

export function convertFileTypeFromBase64(base64: string): string {
  const newBase64 = removeBase64Header(base64)

  // Get the first character after the base64 header has been removed
  const firstChar = newBase64[0]

  // Identify file type based on first character, or add more cases if needed
  switch (firstChar) {
    case '/': // JPEG (JPG)
      return 'jpeg'
    case 'i': // PNG
      return 'png'
    case 'R': // GIF
      return 'gif'
    case 'U': // WebP
      return 'webp'
    case 'J': // PDF (starts with "JVBER")
      return 'pdf'
    case 'P': // ZIP, DOCX, XLSX (ZIP-based formats start with "PK")
      return 'zip'
    case 'Q': // TIFF (often starts with "II")
      return 'tiff'
    case 'S': // BMP (Bitmap)
      return 'bmp'
    case 'T': // TXT (Text file can start with various letters, "T" used as an example)
      return 'txt'
    default:
      return '' // Return empty string if no match found
  }
}

// Adds the appropriate Base64 header back based on the identified file type
export function addBase64Header(base64String: string): string {
  const fileType = convertFileTypeFromBase64(base64String)
  const newBase64 = removeBase64Header(base64String)

  // Determine the appropriate MIME type based on the file type
  if (fileType === 'pdf') {
    return `data:application/${fileType};base64,${newBase64}`
  } else if (['jpeg', 'png', 'gif', 'webp', 'tiff', 'bmp'].includes(fileType)) {
    return `data:image/${fileType};base64,${newBase64}`
  } else if (fileType === 'zip') {
    return `data:application/zip;base64,${newBase64}`
  } else if (fileType === 'txt') {
    return `data:text/plain;base64,${newBase64}`
  }

  // If the file type is not identified, return the original Base64 string
  return base64String
}


export function logger(message: any, type: 'log' | 'warn' | 'error' = 'log') {
  const isProduction = true

  if (isProduction) {
    return
  }
}

export function getFirstCharacter(str: string) {
  if (str && str.length > 0) {
    return str.charAt(0)
  }
  return null
}

export function generateAction(
  key?: string,
  oldValue?: any,
  newValue?: any,
  setting_name?: string,
  fieldName?: string
) {
  return {
    field: key,
    oldValue: oldValue,
    newValue: newValue,
    action: `Update setting in ${setting_name}: ${fieldName ? `${fieldName} -` : ``
      } Change "${key}": "${oldValue ? oldValue : null}" to "${newValue ? newValue : null
      }"`,
  }
}

export function getUserTitle(user: any) {
  const title = user?.title
  switch (title) {
    case UserTitle.MR:
      return 'Mr.'
    case UserTitle.MS:
      return 'Ms.'
    case UserTitle.MRS:
      return 'Mrs.'
    default:
      return ''
  }
}

export const hasPassedRange = (score: number, range: any) => score >= range.min;

export const converterMarkdown = new Converter({
  tasklists: true,
  tables: true,
  underline: true,
  strikethrough: true,
  simplifiedAutoLink: true,
  openLinksInNewWindow: true,
  literalMidWordUnderscores: true,
  excludeTrailingPunctuationFromURLs: true,
  disableForced4SpacesIndentedSublists: true,
});

export const convertTimeToHHMMSS = (time: number): string => {
  const date = new Date(time);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();

  if (hours > 0) {
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  } else {
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }
};

export const lastUpdated = (data: { updated_at: string }[]) => {
  const updatedTimes = data
    .map((item) => moment(item.updated_at))
    .filter((m) => m.isValid());

  if (updatedTimes.length === 0) return null;

  const latestMoment = moment.max(updatedTimes);
  return latestMoment;
};

export const getTimeDiffLabel = (updatedTime: moment.Moment) => {
  const now = moment();

  if (!updatedTime.isValid() || updatedTime.isAfter(now)) {
    return "Just now";
  }
  const diffInMinutes = now.diff(updatedTime, "minutes");
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
  }
  const diffInHours = now.diff(updatedTime, "hours");
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  }
  const diffInDays = now.diff(updatedTime, "days");
  return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
}

export const phoneValidationSchema = (getCountryPhoneIso: string) => {
  const currentCode = countriesList.find((code) => code.iso === getCountryPhoneIso);
  const countryName = countriesList.find((code) => code.phonecode === currentCode?.phonecode)?.nicename;
  return Yup.string()
    .trim()
    .required("Phone number is required")
    .matches(
      /^\+[1-9]\d{1,3}[0-9]{8,15}$/,
      "Enter a valid phone number with country code (e.g., +1234567890)"
    )
    .max(15, "Phone number cannot exceed 15 numbers")
    .test(
      'valid-phone',
      `This is not a valid country code for ${countryName}, the country code is +${currentCode?.phonecode}`,
      function (value) {
        if (!currentCode) return this.createError({ message: "Invalid country selected." });
        const regex = new RegExp(`^\\+${currentCode.phonecode}[0-9]{6,15}$`);
        return regex.test(value ?? '');
      }
    );
}

export const emailValidationSchema = (initialEmail?: string, isCompany?: boolean, isCheckEmail?: boolean) => {
  const url = isCompany
    ? "/company/check-email-exist"
    : "/user/check-email-exist";

  const baseSchema = Yup.string()
    .trim()
    .required("Email is required")
    .min(10, "Email must be at least 10 characters")
    .max(100, "Email cannot exceed 100 characters")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email is not in valid format"
    )
    .test(
      "no-uppercase",
      "Email must be in lowercase",
      (value) => !value || value === value.toLowerCase()
    );

  if (isCheckEmail) {
    return baseSchema.test(
      "email-exists",
      "Email already exists",
      async function (value) {
        const isPotentiallyValid = value && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        if (!value || value === initialEmail || !isPotentiallyValid) {
          return true;
        }
        try {
          const res = await request.post(url, {
            email: value,
          });
          return !res.data.data;
        } catch (err) {
          console.error("Error checking email:", err);
          return true;
        }
      }
    );
  } else {
    return baseSchema;
  }
};

export const passwordValidationSchema = () => {
  return Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /[A-Z]/,
      "Password must contain at least one uppercase letter")
    .matches(
      /[0-9]/,
      "Password must contain at least one number")
    .matches(
      /[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/?]/,
      "Password must contain at least one special character"
    )
    .matches(/^\S*$/, "Password must not contain whitespace")
}

export const breezchatValidationSchema = (role: string) => {

  const baseSchema = Yup.string()
    .trim()
    return baseSchema.test(
      "breezchat-key-required",
      "BreezChat Key is required",
      function (value) {
        if (role === UserRole.ADMIN) {
          return true;
        }
        if (value) {
          return true;
        }
        return false;
      }
    )
};

export const breezchatLimitValidationSchema = (role: string) => {

  const baseSchema = Yup.string()
    .trim()
    return baseSchema.test(
      "breezchat-limit-required",
      "Limit transaction is required",
      function (value) {
        if (role === UserRole.ADMIN) {
          return true;
        }
        if (value) {
          return true;
        }
        return false;
      }
    )
};
export function getWeekRange(dateStr) {
  const date = moment(dateStr);

  const startOfWeek = date.clone().startOf('week').add(1, 'day').startOf('day');
  const endOfWeek = date.clone().startOf('week').add(7, 'day').subtract(1, 'second');

  return {
    start: startOfWeek.toDate(),
    end: endOfWeek.toDate(),
  };
}
export function getMonthRange(dateStr) {
  const date = moment(dateStr);

  const startOfMonth = date.clone().startOf('month').startOf('day');
  const endOfMonth = date.clone().endOf('month').endOf('day');

  return {
    start: startOfMonth.toDate(),
    end: endOfMonth.toDate(),
  };
}

export function getYearRange(dateStr) {
  const date = moment(dateStr);

  const startOfYear = date.clone().startOf('year').startOf('day');
  const endOfYear = date.clone().endOf('year').endOf('day');

  return {
    start: startOfYear.toDate(),
    end: endOfYear.toDate(),
  };
}

function uint8ArrayToHex(uint8Array: Uint8Array): string {
  return Array.from(uint8Array)
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
}

async function signPayload(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload)
  );

  return uint8ArrayToHex(new Uint8Array(signatureBuffer));
}

export function xorScramble(data: string): string {
  const key = import.meta.env.VITE_SECRET_KEY;
  const encoder = new TextEncoder();
  const inputBytes = encoder.encode(data);
  const keyBytes = encoder.encode(key);

  const scrambled = inputBytes.map((byte, i) => byte ^ keyBytes[i % keyBytes.length]);
  return btoa(String.fromCharCode(...scrambled));
}

export function xorUnscramble(data: string): string {
  const key = import.meta.env.VITE_SECRET_KEY;
  const scrambledStr = atob(data);
  const scrambledBytes = Uint8Array.from(scrambledStr, c => c.charCodeAt(0));

  const keyBytes = new TextEncoder().encode(key);
  const originalBytes = scrambledBytes.map((byte, i) => byte ^ keyBytes[i % keyBytes.length]);

  return new TextDecoder().decode(originalBytes);
}

export async function encodeRecentUserToJWT(recentUser: number[]) {
  const header = { alg: "HS256", typ: "JWT" };
  const payload = {
    b: recentUser,
  };

  // Encode both header and payload to base64
  const base64Header = btoa(JSON.stringify(header));
  const base64Payload = btoa(JSON.stringify(payload));

  // Sign the combination of header and payload
  const unsignedToken = `${base64Header}.${base64Payload}`;
  const signature = await signPayload(unsignedToken, import.meta.env.VITE_SECRET_KEY);

  return {
    token: unsignedToken,
    signature: signature
  };
}

export async function decodeRecentUserFromJWT(token: string, receivedSignature: string) {
  if (!token) {
    return [];
  }
  const [base64Header, base64Payload] = token.split(".");
  try {
    // Split token into three parts as expected
    if (!base64Header || !base64Payload) {
      throw new Error("Token format is invalid");
    }

    // Verify signature over header.payload
    const expectedSignature = await signPayload(token, import.meta.env.VITE_SECRET_KEY);

    if (receivedSignature !== expectedSignature) {
      throw new Error("Invalid signature");
    }

    const decoded = JSON.parse(atob(base64Payload));
    return decoded.b || [];
  } catch (e: any) {
    console.error("Invalid token:", e.message);
    return [];
  }
}

export function handleImageUpload(
  event: React.ChangeEvent<HTMLInputElement>,
  options?: {
    formik?: FormikProps<any>;
    actions?: any;
    setAvatarUpload: (avatar: string | null) => void;
    formikField?: string;
  },
) {
  const { formik, actions, setAvatarUpload, formikField } = options || {};

  const file = event.target.files?.[0];
  if (!file) return;

  const allowedTypes = ["image/png", "image/jpeg"];
  const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.type)) {
    swalToast.fire({
      title: "Only PNG or JPEG images are allowed.",
      icon: "error",
    });
    return;
  }

  if (file.size > maxSizeInBytes) {
    swalToast.fire({
      title: "File is too big! Max 5MB",
      icon: "error",
    });
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      if (img.width > 500 || img.height > 500) {
        swalToast.fire({
          title: "Image must be smaller than 500x500 pixels!",
          icon: "error",
        });
        event.target.value = "";
        return;
      }

      const base64String = reader.result as string;

      setAvatarUpload(base64String);

      if (formik) {
        formik?.setFieldValue?.(formikField, base64String);
        if (actions && formikField === "company_logo") {
          actions?.updateGeneralInfo?.({ company_logo: base64String });
        }
      }

      event.target.value = ""; // Clear input
    };

    img.onerror = () => {
      swalToast.fire({
        title: "Invalid image file.",
        icon: "error",
      });
      event.target.value = "";
    };

    img.src = reader.result as string;
  };

  reader.readAsDataURL(file);
};

export const processFiles = async (files: FileList) => {
  const newFiles = [];
  for (const file of Array.from(files)) {
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const isValidFile =
      allowedTypes.includes(file.type) ||
      (fileExtension && allowedExtensions.includes(fileExtension));

    if (!isValidFile) {
      swalToast.fire({ title: "File type not allowed.", icon: "warning" });
      continue;
    }

    const base64 = await convertFileToBase64(file);

    const fileData = {
      id: `${file.name}`,
      type: file.type,
      file_name: file.name,
      size: file.size,
      file_path: base64,
    };
    newFiles.push(fileData);
  }
  return newFiles;
};

export function getMimeType(base64: string): 'pdf' | 'image' | 'unknown' {
  const match = base64.match(/^data:(.*?);base64,/);
  if (!match) return 'unknown';

  const mimeType = match[1];

  if (mimeType === 'application/pdf') return 'pdf';
  if (mimeType.startsWith('image/')) return 'image';

  return 'unknown';
}

export function partialHash(input: string, visiblePartLength: number = 1): string {
  if (!input) return
  const parts = input.split('-');
  return parts
    .map((part, index) => (index < visiblePartLength ? part : '*'.repeat(part.length)))
    .join('-');
}

export function maskString(input: string, visibleChars: number = 10, maxLength: number = 100): string {
  if (!input) return
  const trimmed = input.length > maxLength ? input.slice(0, maxLength) : input;
  const visible = trimmed.slice(0, visibleChars);
  const masked = '*'.repeat(Math.max(0, trimmed.length - visibleChars));
  return visible + masked;
}

export function formatMonth(month: string) {
  const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const monthName = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const index = monthIndex.indexOf(month);
  return index !== -1 ? monthName[index] : month;

}

export function getCountryName(countryIso: string) {
  const country = countriesList.find((item) => item.iso === countryIso);
  return country?.nicename || 'Unknown';
} 