import { getSettings } from "./actions";
import SettingsForm from "./settings-form";

export default async function SettingsPage() {
    const settings = await getSettings();

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
                <p className="text-gray-600">Manage your website configuration</p>
            </div>

            <SettingsForm initialData={settings} />
        </div>
    );
}
