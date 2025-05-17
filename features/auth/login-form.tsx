import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { loginUser } from "@/lib/actions/login-action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { toast: showToast } = useToast();

  const { form, handleSubmitWithAction } = useHookFormAction(
    loginUser,
    zodResolver(loginSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: { email: "", password: "" },
      },
      actionProps: {
        onSuccess: (result) => {
          console.log("Result", result.data);
          if (result.data?.success) {
            showToast({
              title: "Logged in successfully",
              description: "You are now authenticated",
              variant: "success",
            });
          } else {
            showToast({
              title: "Login error",
              description: result.data?.failure,
              variant: "error",
            });
          }
        },
        onError: (error) => {
          console.log("Error", error);
          showToast({
            title: "Login failed",
            description: error.error?.serverError || "An error occurred",
            variant: "error",
          });
        },
      },
    }
  );

  console.log("form", form.formState);

  return (
    <form onSubmit={handleSubmitWithAction} className="space-y-4">
      <div>
        <Input
          {...form.register("email")}
          type="email"
          placeholder="Email"
          className="w-full bg-[#111419] text-white p-4"
        />
        {form.formState.errors.email && (
          <div className="text-red-500 text-sm mt-1">
            {form.formState.errors.email.message as string}
          </div>
        )}
      </div>

      <div className="relative">
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            {...form.register("password")}
            placeholder="Password"
            className="w-full bg-[#111419] text-white p-4 pr-10"
          />
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff size={18} className="text-gray-400" />
            ) : (
              <Eye size={18} className="text-gray-400" />
            )}
          </motion.button>
        </div>

        {form.formState.errors.password && (
          <div className="text-red-500 text-sm mt-1">
            {form.formState.errors.password.message as string}
          </div>
        )}
      </div>

      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="w-full bg-white text-black cursor-pointer font-semibold py-6 rounded-3xl hover:bg-gray-100 transition-colors relative overflow-hidden"
      >
        {form.formState.isSubmitting ? (
          <Loader className="animate-spin" size={18} />
        ) : (
          "Login"
        )}
      </Button>
    </form>
  );
}
