import React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Simple Back Button Component
const BackButton = () => {
  return (
    <TouchableOpacity style={styles.backButton}>
      <Text style={styles.backButtonText}>Back</Text>
    </TouchableOpacity>
  );
};

// Color Constants
const colors = {
  primary: "#3498db",
  border: "#ccc",
  error: "red",
  white: "#fff",
};

export default function App() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      bio: "",
      location: "",
      phone: "",
      address: "",
    },
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <BackButton />

        <View style={styles.container}>
          <Text style={styles.header}>Profile Form</Text>

          {/* Bio Input */}
          <Controller
            control={control}
            name="bio"
            rules={{
              required: "Bio is required",
              maxLength: {
                value: 5,
                message: "Bio cannot exceed 5 characters",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Bio</Text>
                <TextInput
                  style={[styles.input, styles.multilineInput]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Write your bio here..."
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
                {errors.bio && (
                  <Text style={styles.errorText}>{errors.bio.message}</Text>
                )}
              </View>
            )}
          />

          {/* Location Input */}
          <Controller
            control={control}
            name="location"
            rules={{
              required: "Location is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Location</Text>
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your location"
                />
                {errors.location && (
                  <Text style={styles.errorText}>
                    {errors.location.message}
                  </Text>
                )}
              </View>
            )}
          />

          {/* Phone Number Input */}
          <Controller
            control={control}
            name="phone"
            rules={{
              required: "Phone number is required",
              validate: {
                startsWithNine: (value) => {
                  const phoneNumber = value.replace(/\D/g, "");
                  return (
                    phoneNumber.startsWith("63") ||
                    "Phone number must start with 9"
                  );
                },
                isTenDigits: (value) => {
                  const phoneNumber = value.replace(/\D/g, "");
                  return (
                    phoneNumber.length === 14 ||
                    "Phone number must be exactly 14 digits"
                  );
                },
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter phone number"
                  keyboardType="phone-pad"
                  maxLength={14}
                />
                {errors.phone && (
                  <Text style={styles.errorText}>{errors.phone.message}</Text>
                )}
              </View>
            )}
          />

          {/* Address Input */}
          <Controller
            control={control}
            name="address"
            rules={{
              required: "Address is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={"@"}
                  placeholder="Enter valid email address"
                />
                {errors.address && (
                  <Text style={styles.errorText}>{errors.address.message}</Text>
                )}
              </View>
            )}
          />

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 40,
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
  },
  backButton: {
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  backButtonText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "600",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  multilineInput: {
    height: 100,
  },
  errorText: {
    color: colors.error,
    marginTop: 6,
    fontSize: 13,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
})