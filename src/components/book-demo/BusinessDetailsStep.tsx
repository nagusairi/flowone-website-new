import { memo, ChangeEvent } from "react";
import { DemoFormData, FormErrors } from "./BookDemoTypes";
import { ROLE_OPTIONS } from "./priority-definitions";

interface BusinessDetailsStepProps {
  data: DemoFormData;
  errors: FormErrors;
  onChange: (field: keyof DemoFormData, value: string) => void;
}

export const BusinessDetailsStep = memo(function BusinessDetailsStep({
  data,
  errors,
  onChange,
}: BusinessDetailsStepProps) {
  const handleChange = (field: keyof DemoFormData) => (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onChange(field, e.target.value);
  };

  return (
    <section className="demo-stage" data-stage="1" aria-labelledby="demo-business-title">
      <h2 id="demo-business-title" className="demo-heading" tabIndex={-1}>
        Tell us about
        <br />
        your business.
      </h2>
      <p className="demo-subtitle">
        A little context helps us make the walkthrough relevant.
      </p>

      <div className="demo-fields">
        {/* Company Name */}
        <div className="demo-field">
          <label htmlFor="demo-company">Company name</label>
          <input
            id="demo-company"
            name="company"
            type="text"
            autoComplete="organization"
            required
            placeholder="Your company"
            value={data.company}
            onChange={handleChange("company")}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? "demo-company-error" : undefined}
          />
          {errors.company && (
            <p className="field-error" id="demo-company-error" role="alert">
              {errors.company}
            </p>
          )}
        </div>

        {/* Role Select */}
        <div className="demo-field">
          <label htmlFor="demo-role">Your role</label>
          <select
            id="demo-role"
            name="role"
            required
            value={data.role}
            onChange={handleChange("role")}
            aria-invalid={Boolean(errors.role)}
            aria-describedby={errors.role ? "demo-role-error" : undefined}
          >
            <option value="">Select your role</option>
            {ROLE_OPTIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          {errors.role && (
            <p className="field-error" id="demo-role-error" role="alert">
              {errors.role}
            </p>
          )}
        </div>

        {/* Work Email */}
        <div className="demo-field">
          <label htmlFor="demo-email">Work email</label>
          <input
            id="demo-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@company.com"
            value={data.email}
            onChange={handleChange("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "demo-email-error" : undefined}
          />
          {errors.email && (
            <p className="field-error" id="demo-email-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>
      </div>
    </section>
  );
});
