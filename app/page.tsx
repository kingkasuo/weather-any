"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

type Theme = "light" | "dark";

interface StrengthPreset {
  label: string;
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

const strengthPresets: StrengthPreset[] = [
  { label: "弱", length: 8, uppercase: true, lowercase: true, numbers: false, symbols: false },
  { label: "中等", length: 12, uppercase: true, lowercase: true, numbers: true, symbols: false },
  { label: "强", length: 16, uppercase: true, lowercase: true, numbers: true, symbols: true },
  { label: "非常强", length: 24, uppercase: true, lowercase: true, numbers: true, symbols: true },
];

export default function PasswordGenerator() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [copied, setCopied] = useState(false);
  const [strengthLevel, setStrengthLevel] = useState(2);

  // 应用主题到 html 元素
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // 当强度滑块改变时，应用预设
  const handleStrengthChange = (value: number) => {
    setStrengthLevel(value);
    const preset = strengthPresets[value];
    setLength(preset.length);
    setUppercase(preset.uppercase);
    setLowercase(preset.lowercase);
    setNumbers(preset.numbers);
    setSymbols(preset.symbols);
  };

  const generatePassword = useCallback(() => {
    let chars = "";
    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:',.<>?";

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
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getPasswordStrength = () => {
    let score = 0;
    if (length >= 8) score++;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (uppercase) score++;
    if (lowercase) score++;
    if (numbers) score++;
    if (symbols) score++;

    if (score <= 2) return { label: "弱", color: theme === "dark" ? "bg-red-500" : "bg-red-600", width: "w-1/4" };
    if (score <= 4) return { label: "中等", color: theme === "dark" ? "bg-yellow-500" : "bg-yellow-600", width: "w-2/4" };
    if (score <= 6) return { label: "强", color: theme === "dark" ? "bg-green-500" : "bg-green-600", width: "w-3/4" };
    return { label: "非常强", color: theme === "dark" ? "bg-emerald-500" : "bg-emerald-600", width: "w-full" };
  };

  const strength = getPasswordStrength();

  // 根据主题动态样式
  const bgGradient = theme === "dark"
    ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    : "bg-gradient-to-br from-slate-100 via-white to-slate-100";

  const cardStyle = theme === "dark"
    ? "border-slate-700 bg-slate-800/50"
    : "border-slate-200 bg-white/80";

  const cardTitleStyle = theme === "dark" ? "text-white" : "text-slate-900";

  const cardDescStyle = theme === "dark" ? "text-slate-400" : "text-slate-500";

  const labelStyle = theme === "dark" ? "text-slate-300" : "text-slate-700";

  const lengthBadgeStyle = theme === "dark" ? "text-white bg-slate-700" : "text-slate-900 bg-slate-200";

  const inputStyle = theme === "dark"
    ? "bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
    : "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400";

  const buttonOutlineStyle = theme === "dark"
    ? "border-slate-600 hover:bg-slate-700 text-white"
    : "border-slate-300 hover:bg-slate-100 text-slate-700";

  const strengthBarBg = theme === "dark" ? "bg-slate-700" : "bg-slate-200";

  const strengthTextStyle = theme === "dark" ? "text-slate-400" : "text-slate-500";

  const themeIcon = theme === "dark" ? (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
  );

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${bgGradient} transition-colors duration-300`}>
      {/* 主题切换按钮 */}
      <div className="fixed top-4 right-4">
        <Button
          onClick={toggleTheme}
          variant="outline"
          size="icon"
          className={`rounded-full ${buttonOutlineStyle} backdrop-blur`}
        >
          {themeIcon}
        </Button>
      </div>

      <Card className={`w-full max-w-md shadow-2xl ${cardStyle} backdrop-blur transition-colors duration-300`}>
        <CardHeader className="text-center">
          <CardTitle className={`text-2xl font-bold ${cardTitleStyle}`}>密码生成器</CardTitle>
          <CardDescription className={cardDescStyle}>
            生成安全的随机密码
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 密码显示区域 */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                value={password}
                readOnly
                placeholder="点击生成按钮创建密码"
                className={`font-mono text-lg ${inputStyle}`}
              />
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className={`shrink-0 ${buttonOutlineStyle}`}
              >
                {copied ? "已复制" : "复制"}
              </Button>
            </div>
            {/* 密码强度指示器 */}
            {password && (
              <div className="space-y-1">
                <div className={`flex justify-between text-xs ${strengthTextStyle}`}>
                  <span>密码强度</span>
                  <span>{strength.label}</span>
                </div>
                <div className={`h-2 ${strengthBarBg} rounded-full overflow-hidden`}>
                  <div
                    className={`h-full ${strength.color} transition-all duration-300 ${strength.width}`}
                  />
                </div>
              </div>
            )}
          </div>

          {/* 密码强度预设滑块 */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className={labelStyle}>预设强度</Label>
              <span className={`font-mono px-2 py-1 rounded ${lengthBadgeStyle}`}>
                {strengthPresets[strengthLevel].label}
              </span>
            </div>
            <Slider
              min={0}
              max={3}
              step={1}
              value={[strengthLevel]}
              onValueChange={(value) => handleStrengthChange(Array.isArray(value) ? value[0] : value)}
              className="w-full"
            />
            <div className={`flex justify-between text-xs ${strengthTextStyle}`}>
              <span>弱</span>
              <span>中等</span>
              <span>强</span>
              <span>非常强</span>
            </div>
          </div>

          {/* 密码长度 */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="length" className={labelStyle}>密码长度</Label>
              <span className={`font-mono px-2 py-1 rounded ${lengthBadgeStyle}`}>
                {length}
              </span>
            </div>
            <Slider
              id="length"
              min={4}
              max={64}
              step={1}
              value={[length]}
              onValueChange={(value) => setLength(Array.isArray(value) ? value[0] : value)}
              className="w-full"
            />
            <div className={`flex justify-between text-xs ${strengthTextStyle}`}>
              <span>4</span>
              <span>64</span>
            </div>
          </div>

          {/* 字符类型选择 */}
          <div className="space-y-4">
            <Label className={labelStyle}>字符类型</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="uppercase"
                  checked={uppercase}
                  onCheckedChange={(checked) => setUppercase(checked as boolean)}
                />
                <label
                  htmlFor="uppercase"
                  className={`text-sm font-medium leading-none ${labelStyle} cursor-pointer`}
                >
                  大写字母 A-Z
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lowercase"
                  checked={lowercase}
                  onCheckedChange={(checked) => setLowercase(checked as boolean)}
                />
                <label
                  htmlFor="lowercase"
                  className={`text-sm font-medium leading-none ${labelStyle} cursor-pointer`}
                >
                  小写字母 a-z
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="numbers"
                  checked={numbers}
                  onCheckedChange={(checked) => setNumbers(checked as boolean)}
                />
                <label
                  htmlFor="numbers"
                  className={`text-sm font-medium leading-none ${labelStyle} cursor-pointer`}
                >
                  数字 0-9
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="symbols"
                  checked={symbols}
                  onCheckedChange={(checked) => setSymbols(checked as boolean)}
                />
                <label
                  htmlFor="symbols"
                  className={`text-sm font-medium leading-none ${labelStyle} cursor-pointer`}
                >
                  特殊符号
                </label>
              </div>
            </div>
          </div>

          {/* 生成按钮 */}
          <Button
            onClick={generatePassword}
            className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
          >
            生成密码
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
