import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  try {
    const code = req.body.code;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `make a .readme documentation of this code in spanish with titles and examples\n${code}`,
      temperature: 0,
      max_tokens: 372,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    res.status(200).json({ result: response.data.choices[0].text });
  } catch (error) {
    console.log(error);
    res.status(400).json({ result: "completion.data.choices[0].text" });
  }
}
