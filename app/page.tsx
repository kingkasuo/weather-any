"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("ljQT%3D+Nl~A");
  const [length, setLength] = useState(12);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let chars = "";
    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*";

    if (chars.length === 0) {
      setPassword("请至少选择一种字符类型");
      return;
    }

    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
    setCopied(false);
  }, [length, uppercase, lowercase, numbers, symbols]);

  const copyToClipboard = async () => {
    if (password) {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* 顶部通知提示 */}
      {copied && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="bg-white shadow-lg rounded-lg px-4 py-3 flex items-center gap-3 border border-gray-100">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">密码已复制到剪贴板</p>
              <p className="text-gray-500 text-xs">现在可以粘贴到需要的地方</p>
            </div>
          </div>
        </div>
      )}

      {/* 主标题区 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">密码生成器</h1>
        <p className="text-gray-500">使用 Shadcn UI 构建的安全密码生成工具</p>
      </div>

      {/* 核心功能卡片 */}
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-gray-900">密码生成器</CardTitle>
          <CardDescription className="text-gray-500">生成安全、随机的密码</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 密码展示区 */}
          <div className="flex gap-2">
            <Input
              value={password}
              readOnly
              className="font-mono text-base border-gray-200 focus-visible:ring-gray-300"
            />
            <Button
              onClick={copyToClipboard}
              variant="outline"
              size="icon"
              className="shrink-0 border-green-500 text-green-600 hover:bg-green-50"
              title="复制密码"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </Button>
            <Button
              onClick={generatePassword}
              variant="outline"
              size="icon"
              className="shrink-0"
              title="刷新密码"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </Button>
          </div>

          {/* 密码长度控制 */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-gray-900 font-medium">密码长度: {length}</Label>
            </div>
            <Slider
              min={6}
              max={32}
              step={1}
              value={[length]}
              onValueChange={(value) => setLength(Array.isArray(value) ? value[0] : value)}
              className="w-full"
            />
          </div>

          {/* 字符类型选项 */}
          <div className="space-y-3">
            <Label className="text-gray-900 font-medium">包含字符:</Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="uppercase"
                  checked={uppercase}
                  onCheckedChange={(checked) => setUppercase(checked as boolean)}
                />
                <label htmlFor="uppercase" className="text-sm text-gray-700 cursor-pointer">
                  大写字母 (A-Z)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lowercase"
                  checked={lowercase}
                  onCheckedChange={(checked) => setLowercase(checked as boolean)}
                />
                <label htmlFor="lowercase" className="text-sm text-gray-700 cursor-pointer">
                  小写字母 (a-z)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="numbers"
                  checked={numbers}
                  onCheckedChange={(checked) => setNumbers(checked as boolean)}
                />
                <label htmlFor="numbers" className="text-sm text-gray-700 cursor-pointer">
                  数字 (0-9)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="symbols"
                  checked={symbols}
                  onCheckedChange={(checked) => setSymbols(checked as boolean)}
                />
                <label htmlFor="symbols" className="text-sm text-gray-700 cursor-pointer">
                  特殊符号 (!@#$%^&*)
                </label>
              </div>
            </div>
          </div>

          {/* 生成按钮 */}
          <Button
            onClick={generatePassword}
            className="w-full h-11 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg"
          >
            生成新密码
          </Button>
        </CardContent>
      </Card>

      {/* 页脚信息 */}
      <footer className="mt-8 text-center text-gray-400 text-sm">
        © 2025 密码生成器 | 使用 Next.js 和 Shadcn UI 构建
      </footer>
    </div>
  );
}
