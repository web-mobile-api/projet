import { AccountController } from "./controller/accountController.js";
import { CommentController } from "./controller/commentController.js";
import { EventController } from "./controller/eventController.js";

let account_test = Promise.resolve(AccountController.login("j.h.gipson62@gmail.com", "password"));
console.log(account_test);