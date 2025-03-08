"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FileIcon, XIcon, UploadIcon } from "lucide-react";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/pdf": [".pdf"],
    },
  });

  return (
    <div className="container mx-auto px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Upload Bank Statements */}
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed cursor-pointer hover:bg-muted/50 transition-colors h-full",
            isDragActive ? "border-primary" : "border-muted-foreground/25"
          )}
        >
          <input {...getInputProps()} />

          <Card className="border-0 bg-transparent h-full flex flex-col">
            <CardHeader>
              <CardTitle>Upload Bank Statements</CardTitle>
              <CardDescription>
                Drag and drop your bank or credit card statements in CSV or PDF
                format
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {files.length > 0 ? (
                <div className="space-y-3">
                  <div className="text-sm font-medium">Selected files:</div>
                  <ul className="space-y-2">
                    {files.map((file, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between bg-muted/50 p-2 text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <FileIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="truncate max-w-[200px]">
                            {file.name}
                          </span>
                          <span className="text-muted-foreground">
                            ({Math.round(file.size / 1024)} KB)
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFiles((prevFiles) =>
                              prevFiles.filter((_, i) => i !== index)
                            );
                          }}
                        >
                          <XIcon className="h-4 w-4" />
                          <span className="sr-only">Remove file</span>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                  <UploadIcon className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click or drag and drop to upload files
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="mt-auto">
              <div className="w-full">
                <p className="mb-2 text-sm">{files.length} file(s) selected</p>
                <Button className="w-full" disabled={files.length === 0}>
                  Process Statements
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Add Manual Transaction */}
        <Card className="border h-full flex flex-col">
          <CardHeader>
            <CardTitle>Add Manual Transaction</CardTitle>
            <CardDescription>
              Record financial activities not present in your bank statements
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="transaction-type">Transaction Type</Label>
                  <Select>
                    <SelectTrigger id="transaction-type" className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="expense">Expense</SelectItem>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="transfer">Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" placeholder="0.00" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Transaction description" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category" className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="groceries">Groceries</SelectItem>
                      <SelectItem value="entertainment">
                        Entertainment
                      </SelectItem>
                      <SelectItem value="utilities">Utilities</SelectItem>
                      <SelectItem value="transportation">
                        Transportation
                      </SelectItem>
                      <SelectItem value="housing">Housing</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="mt-auto">
            <Button className="w-full">Add Transaction</Button>
          </CardFooter>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card className="border mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Transactions</CardTitle>
              <CardDescription>
                AI-powered categorized transactions
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 mr-1"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <line x1="3" x2="21" y1="9" y2="9" />
                  <line x1="9" x2="9" y1="21" y2="9" />
                </svg>
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 mr-1"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead>
                  <tr className="border-b transition-colors bg-muted/50">
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      Date
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      Description
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      Category
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      Amount
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle">2025-03-04</td>
                    <td className="p-4 align-middle">
                      Transferência recebida pelo Pix - CAIO RODRIGUES
                    </td>
                    <td className="p-4 align-middle">
                      <span className="inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold bg-emerald-50 text-emerald-700 border-emerald-200">
                        Income
                      </span>
                    </td>
                    <td className="p-4 align-middle font-medium text-emerald-600">
                      R$ 30.00
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                            <path d="m15 5 4 4" />
                          </svg>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          </svg>
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle">2025-03-04</td>
                    <td className="p-4 align-middle">
                      Transferência enviada pelo Pix - BIANKA VICTORIA
                    </td>
                    <td className="p-4 align-middle">
                      <span className="inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold bg-rose-50 text-rose-600 border-rose-200">
                        Expense
                      </span>
                    </td>
                    <td className="p-4 align-middle font-medium text-rose-500">
                      -R$ 6.00
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                            <path d="m15 5 4 4" />
                          </svg>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          </svg>
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle">2025-02-20</td>
                    <td className="p-4 align-middle">Gopag S*Bendito Japa</td>
                    <td className="p-4 align-middle">
                      <span className="inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold bg-purple-50 text-purple-700 border-purple-200">
                        Food
                      </span>
                    </td>
                    <td className="p-4 align-middle font-medium text-rose-500">
                      -R$ 205.50
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                            <path d="m15 5 4 4" />
                          </svg>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          </svg>
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr className="transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle">2025-02-01</td>
                    <td className="p-4 align-middle">
                      Elidia Isabel Paraizo - Parcela 3/3
                    </td>
                    <td className="p-4 align-middle">
                      <span className="inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold bg-blue-50 text-blue-700 border-blue-200">
                        Installment
                      </span>
                    </td>
                    <td className="p-4 align-middle font-medium text-rose-500">
                      -R$ 114.96
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                            <path d="m15 5 4 4" />
                          </svg>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          </svg>
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex items-center justify-end p-2 text-sm text-muted-foreground">
            Showing 4 of 120 transactions
          </div>
        </CardContent>
      </Card>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Month Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Income</span>
                  <span className="text-sm font-medium text-emerald-600">
                    R$ 6,250.00
                  </span>
                </div>
                <div className="h-2 bg-muted overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[80%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Expenses
                  </span>
                  <span className="text-sm font-medium text-rose-500">
                    R$ 4,820.75
                  </span>
                </div>
                <div className="h-2 bg-muted overflow-hidden">
                  <div className="h-full bg-rose-400 w-[60%]" />
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Balance</span>
                  <span className="font-medium text-emerald-600">
                    R$ 1,429.25
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Top Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-emerald-500" />
                  <span className="text-sm">Food</span>
                </div>
                <span className="text-sm font-medium">R$ 1,240.50</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-purple-500" />
                  <span className="text-sm">Utilities</span>
                </div>
                <span className="text-sm font-medium">R$ 850.25</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-orange-500" />
                  <span className="text-sm">Transportation</span>
                </div>
                <span className="text-sm font-medium">R$ 725.00</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-emerald-500" />
                  <span className="text-sm">Entertainment</span>
                </div>
                <span className="text-sm font-medium">R$ 620.30</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-rose-400" />
                  <span className="text-sm">Others</span>
                </div>
                <span className="text-sm font-medium">R$ 1,384.70</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Upcoming Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Credit Card Payment</div>
                  <div className="text-xs text-muted-foreground">
                    Due in 5 days
                  </div>
                </div>
                <span className="font-medium text-rose-500">R$ 1,250.00</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Internet Bill</div>
                  <div className="text-xs text-muted-foreground">
                    Due in 8 days
                  </div>
                </div>
                <span className="font-medium text-rose-500">R$ 120.00</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Smartphone Installment</div>
                  <div className="text-xs text-muted-foreground">
                    Due in 12 days
                  </div>
                </div>
                <span className="font-medium text-rose-500">R$ 210.00</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Rent</div>
                  <div className="text-xs text-muted-foreground">
                    Due in 15 days
                  </div>
                </div>
                <span className="font-medium text-rose-500">R$ 900.00</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full text-xs">
              View All Upcoming Payments
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
