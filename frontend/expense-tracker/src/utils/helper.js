import { useState } from "react";
import moment from "moment"; // 👈 ADD THIS LINE
/**
 * Validates if the given string is a valid email address.
 * @param {string} email - The email string to validate.
 * @returns {boolean} - True if the email is valid, false otherwise.
 */
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Gets the first letter of the first two words in a name.
 * @param {string} name - The full name string.
 * @returns {string} - The initials (e.g., "JD" for "John Doe").
 */
export const getInitials = (name) => {
  if (!name) return "";
  const words = name.split(" ");
  let initials = "";
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }
  return initials.toUpperCase();
};

/**
 * Formats a number by adding thousand separators (commas).
 * @param {number} num - The number to format.
 * @returns {string} - The formatted number as a string.
 */
export const addThousandSeparator = (num) => {
  // Return an empty string if the input is not a valid number.
  if (num === null || num === undefined || isNaN(num)) return "";

  // Split the number into its integer and fractional parts.
  const [integerPart, fractionalPart] = num.toString().split(".");

  // Use a regular expression to insert commas into the integer part.
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Re-join the integer and fractional parts if a fractional part exists.
  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    category: item?.category,
    amount: item?.amount,
  }));

  return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM"),
    amount: item?.amount,
    source: item?.source,
  }));

  return chartData;
};

export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const chartData = sortedData.map((item) => ({
    monthe: moment(item?.date).format("Do MMM"),
    amount: item?.amount,
    category: item?.category,
  }));
  return chartData;
};
