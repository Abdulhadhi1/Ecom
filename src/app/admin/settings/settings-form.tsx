"use client";

import { Save } from "lucide-react";
import { useState } from "react";
import { updateSettings } from "./actions";
import SubmitButton from "@/components/submit-button";

const currencies = [
    { name: "US Dollar", symbol: "$", flag: "🇺🇸", code: "USD" },
    { name: "Euro", symbol: "€", flag: "🇪🇺", code: "EUR" },
    { name: "British Pound", symbol: "£", flag: "🇬🇧", code: "GBP" },
    { name: "Indian Rupee", symbol: "₹", flag: "🇮🇳", code: "INR" },
    { name: "United Arab Emirates Dirham", symbol: "🇦🇪 ", flag: "🇦🇪", code: "AED" },
    { name: "Kuwaiti Dinar", symbol: "KD ", flag: "🇰🇼", code: "KWD" },
    { name: "Saudi Riyal", symbol: "SR ", flag: "🇸🇦", code: "SAR" },
    { name: "Japanese Yen", symbol: "¥", flag: "🇯🇵", code: "JPY" },
    { name: "Canadian Dollar", symbol: "CA$", flag: "🇨🇦", code: "CAD" },
    { name: "Australian Dollar", symbol: "A$", flag: "🇦🇺", code: "AUD" },
    { name: "Swiss Franc", symbol: "CHF", flag: "🇨🇭", code: "CHF" },
    { name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳", code: "CNY" },
    { name: "Turkish Lira", symbol: "₺", flag: "🇹🇷", code: "TRY" },
    { name: "Brazilian Real", symbol: "R$", flag: "🇧🇷", code: "BRL" },
    { name: "South African Rand", symbol: "R", flag: "🇿🇦", code: "ZAR" },
    { name: "Singapore Dollar", symbol: "S$", flag: "🇸🇬", code: "SGD" },
    { name: "New Zealand Dollar", symbol: "NZ$", flag: "🇳🇿", code: "NZD" },
    { name: "Hong Kong Dollar", symbol: "HK$", flag: "🇭🇰", code: "HKD" },
];

export default function SettingsForm({
    initialData,
}: {
    initialData: {
        currencySymbol: string;
        siteName: string;
    };
}) {
    const [currencySymbol, setCurrencySymbol] = useState(initialData.currencySymbol);
    const [siteName, setSiteName] = useState(initialData.siteName);

    return (
        <form
            action={async (formData) => {
                await updateSettings(formData);
                alert("Settings updated successfully!");
            }}
            className="max-w-2xl space-y-6"
        >
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Site Name
                        </label>
                        <input
                            type="text"
                            name="siteName"
                            value={siteName}
                            onChange={(e) => setSiteName(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                            placeholder="My Awesome Store"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Currency Configuration
                        </label>
                        <select
                            name="currencySymbol"
                            value={currencySymbol}
                            onChange={(e) => setCurrencySymbol(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white"
                            required
                        >
                            {currencies.map((curr) => (
                                <option key={curr.code} value={curr.symbol}>
                                    {curr.flag} {curr.name} ({curr.symbol})
                                </option>
                            ))}
                        </select>
                        <p className="mt-2 text-sm text-gray-500">
                            Select the currency symbol that will be displayed across your store.
                        </p>
                    </div>
                </div>

                <div className="mt-8">
                    <SubmitButton icon={<Save className="w-5 h-5" />} pendingText="Updating Settings...">
                        Save Settings
                    </SubmitButton>
                </div>
            </div>
        </form>
    );
}
