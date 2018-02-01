"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
index_1.talk("Do you hear anything? You should.", "en")
    .then(function () { return document.write("IT WORKS!"); }, function () { return document.write("FAILED!"); });
