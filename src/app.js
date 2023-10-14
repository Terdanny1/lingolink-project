const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { translate } = require("@vitalets/google-translate-api");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.resolve(__dirname, "../public")));
app.use(express.static(path.resolve(__dirname, "src/assets")));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (_, res) => {
    res.render("index", { translation: undefined });
});

app.post("/", async (req, res) => {
    const { fromInput, fromLang, toLang } = req.body;
    try {
        const { text: translatedtext } = await translate(fromInput, {
            from: fromLang,
            to: toLang,
        });

        const translation = {
            fromText: fromInput,
            fromLang,
            toLang,
            result: translatedtext,
        };
        res.render("index", { translation });
    } catch (error) {
        console.log(error);
        res.render("index", { translation: undefined });
    }
});

app.listen(3000, () => {
    console.log(`express server running on 3000`);
});
