import { npmPackagr } from "npm-packagr";
import {
    assets,
    badge,
    BadgeType,
    git,
    packageJSON,
    publish,
    test,
    version,
} from "npm-packagr/pipes";

npmPackagr({
    pipeline: [
        git("commit", "rxjs-nano"),

        packageJSON((packageJson) => {
            delete packageJson.devDependencies;
            delete packageJson.scripts;
        }),

        ({ exec, packageDirectory }) => {
            exec(`tsc --outDir ${packageDirectory}`);
        },

        test(),

        badge(BadgeType.Test),
        badge(BadgeType.License),

        version("patch", {
            commitHooks: false,
            gitTagVersion: false,
        }),

        assets("LICENSE", "README.md"),

        git("commit", "rxjs-nano"),
        git("push"),

        publish({
            login: { account: "rxjs-nano", email: "rxjs.nano@gmail.com" },
        }),
    ],
});
