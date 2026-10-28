export type PriorityId =
  | "collections"
  | "cash"
  | "procurement"
  | "inventory"
  | "control"
  | "explore";

export interface PriorityOption {
  id: PriorityId;
  label: string;
  tagline: string;
  contextTitle: string;
  contextDesc: string;
  svgPath: string;
  fullWidth?: boolean;
  dashed?: boolean;
}

export type RoleOption =
  | "CFO / Finance leader"
  | "CEO / Business owner"
  | "Finance controller / Accounts"
  | "AR / Credit / Collections"
  | "Operations / Procurement"
  | "Warehouse / Inventory"
  | "IT / Systems"
  | "Other";

export interface DemoFormData {
  priorities: PriorityId[];
  company: string;
  role: string;
  email: string;
  name: string;
  phone: string;
  note: string;
}

export interface FormErrors {
  priorities?: string;
  company?: string;
  role?: string;
  email?: string;
  name?: string;
  phone?: string;
  note?: string;
}
