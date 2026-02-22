
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

type Config = {
	dbUrl: string;
    currentUsername: string;
};

export function setUser(username: string) {

    const config = readConfig();

    config.currentUsername = username;

    writeConfig(config);
}

export function readConfig(): Config {  
    const filePath = getConfigFilePath();   

    const data = fs.readFileSync(filePath, "utf8");
    const rawConfig = JSON.parse(data);

    return validateConfig(rawConfig);
}

function getConfigFilePath(): string {
    const homeDirectory = os.homedir();
    return path.join(homeDirectory, ".gatorconfig.json");
}

function writeConfig(cfg: Config): void {

    const filePath = getConfigFilePath();

    const snakeCaseObject = {
        db_url: cfg.dbUrl,
        current_user_name: cfg.currentUsername,
    };

    const jsonString = JSON.stringify(snakeCaseObject, null, 2);

    fs.writeFileSync(filePath, jsonString);
}

function validateConfig(rawConfig: any): Config {

    if (typeof rawConfig !== 'object' || rawConfig === null || Array.isArray(rawConfig)) {
        throw new Error('Config must be a plain object');
    }

    if (typeof rawConfig.db_url !== 'string') {
        throw new Error('Config must have a db_url string field');
    }

    if (typeof rawConfig.current_user_name !== 'string') {
        throw new Error('current_user_name must be a string if provided');
    }

    return {
        dbUrl: rawConfig.db_url,
        currentUsername: rawConfig.current_user_name as string,
    };
}
