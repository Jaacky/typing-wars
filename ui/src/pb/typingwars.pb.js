/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.typingwars = (function() {

    /**
     * Namespace typingwars.
     * @exports typingwars
     * @namespace
     */
    var typingwars = {};

    typingwars.UserInput = (function() {

        /**
         * Properties of a UserInput.
         * @memberof typingwars
         * @interface IUserInput
         * @property {string|null} [key] UserInput key
         */

        /**
         * Constructs a new UserInput.
         * @memberof typingwars
         * @classdesc Represents a UserInput.
         * @implements IUserInput
         * @constructor
         * @param {typingwars.IUserInput=} [properties] Properties to set
         */
        function UserInput(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserInput key.
         * @member {string} key
         * @memberof typingwars.UserInput
         * @instance
         */
        UserInput.prototype.key = "";

        /**
         * Creates a new UserInput instance using the specified properties.
         * @function create
         * @memberof typingwars.UserInput
         * @static
         * @param {typingwars.IUserInput=} [properties] Properties to set
         * @returns {typingwars.UserInput} UserInput instance
         */
        UserInput.create = function create(properties) {
            return new UserInput(properties);
        };

        /**
         * Encodes the specified UserInput message. Does not implicitly {@link typingwars.UserInput.verify|verify} messages.
         * @function encode
         * @memberof typingwars.UserInput
         * @static
         * @param {typingwars.IUserInput} message UserInput message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserInput.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.key != null && message.hasOwnProperty("key"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.key);
            return writer;
        };

        /**
         * Encodes the specified UserInput message, length delimited. Does not implicitly {@link typingwars.UserInput.verify|verify} messages.
         * @function encodeDelimited
         * @memberof typingwars.UserInput
         * @static
         * @param {typingwars.IUserInput} message UserInput message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserInput.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserInput message from the specified reader or buffer.
         * @function decode
         * @memberof typingwars.UserInput
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {typingwars.UserInput} UserInput
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserInput.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.typingwars.UserInput();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.key = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserInput message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof typingwars.UserInput
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {typingwars.UserInput} UserInput
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserInput.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserInput message.
         * @function verify
         * @memberof typingwars.UserInput
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserInput.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.key != null && message.hasOwnProperty("key"))
                if (!$util.isString(message.key))
                    return "key: string expected";
            return null;
        };

        /**
         * Creates a UserInput message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof typingwars.UserInput
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {typingwars.UserInput} UserInput
         */
        UserInput.fromObject = function fromObject(object) {
            if (object instanceof $root.typingwars.UserInput)
                return object;
            var message = new $root.typingwars.UserInput();
            if (object.key != null)
                message.key = String(object.key);
            return message;
        };

        /**
         * Creates a plain object from a UserInput message. Also converts values to other types if specified.
         * @function toObject
         * @memberof typingwars.UserInput
         * @static
         * @param {typingwars.UserInput} message UserInput
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserInput.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.key = "";
            if (message.key != null && message.hasOwnProperty("key"))
                object.key = message.key;
            return object;
        };

        /**
         * Converts this UserInput to JSON.
         * @function toJSON
         * @memberof typingwars.UserInput
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserInput.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserInput;
    })();

    typingwars.UserAction = (function() {

        /**
         * Properties of a UserAction.
         * @memberof typingwars
         * @interface IUserAction
         * @property {typingwars.IUserInput|null} [userInput] UserAction userInput
         */

        /**
         * Constructs a new UserAction.
         * @memberof typingwars
         * @classdesc Represents a UserAction.
         * @implements IUserAction
         * @constructor
         * @param {typingwars.IUserAction=} [properties] Properties to set
         */
        function UserAction(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserAction userInput.
         * @member {typingwars.IUserInput|null|undefined} userInput
         * @memberof typingwars.UserAction
         * @instance
         */
        UserAction.prototype.userInput = null;

        /**
         * Creates a new UserAction instance using the specified properties.
         * @function create
         * @memberof typingwars.UserAction
         * @static
         * @param {typingwars.IUserAction=} [properties] Properties to set
         * @returns {typingwars.UserAction} UserAction instance
         */
        UserAction.create = function create(properties) {
            return new UserAction(properties);
        };

        /**
         * Encodes the specified UserAction message. Does not implicitly {@link typingwars.UserAction.verify|verify} messages.
         * @function encode
         * @memberof typingwars.UserAction
         * @static
         * @param {typingwars.IUserAction} message UserAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserAction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userInput != null && message.hasOwnProperty("userInput"))
                $root.typingwars.UserInput.encode(message.userInput, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified UserAction message, length delimited. Does not implicitly {@link typingwars.UserAction.verify|verify} messages.
         * @function encodeDelimited
         * @memberof typingwars.UserAction
         * @static
         * @param {typingwars.IUserAction} message UserAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserAction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserAction message from the specified reader or buffer.
         * @function decode
         * @memberof typingwars.UserAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {typingwars.UserAction} UserAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserAction.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.typingwars.UserAction();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.userInput = $root.typingwars.UserInput.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserAction message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof typingwars.UserAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {typingwars.UserAction} UserAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserAction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserAction message.
         * @function verify
         * @memberof typingwars.UserAction
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserAction.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userInput != null && message.hasOwnProperty("userInput")) {
                var error = $root.typingwars.UserInput.verify(message.userInput);
                if (error)
                    return "userInput." + error;
            }
            return null;
        };

        /**
         * Creates a UserAction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof typingwars.UserAction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {typingwars.UserAction} UserAction
         */
        UserAction.fromObject = function fromObject(object) {
            if (object instanceof $root.typingwars.UserAction)
                return object;
            var message = new $root.typingwars.UserAction();
            if (object.userInput != null) {
                if (typeof object.userInput !== "object")
                    throw TypeError(".typingwars.UserAction.userInput: object expected");
                message.userInput = $root.typingwars.UserInput.fromObject(object.userInput);
            }
            return message;
        };

        /**
         * Creates a plain object from a UserAction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof typingwars.UserAction
         * @static
         * @param {typingwars.UserAction} message UserAction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserAction.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.userInput = null;
            if (message.userInput != null && message.hasOwnProperty("userInput"))
                object.userInput = $root.typingwars.UserInput.toObject(message.userInput, options);
            return object;
        };

        /**
         * Converts this UserAction to JSON.
         * @function toJSON
         * @memberof typingwars.UserAction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserAction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserAction;
    })();

    typingwars.ClientError = (function() {

        /**
         * Properties of a ClientError.
         * @memberof typingwars
         * @interface IClientError
         * @property {string|null} [message] ClientError message
         */

        /**
         * Constructs a new ClientError.
         * @memberof typingwars
         * @classdesc Represents a ClientError.
         * @implements IClientError
         * @constructor
         * @param {typingwars.IClientError=} [properties] Properties to set
         */
        function ClientError(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ClientError message.
         * @member {string} message
         * @memberof typingwars.ClientError
         * @instance
         */
        ClientError.prototype.message = "";

        /**
         * Creates a new ClientError instance using the specified properties.
         * @function create
         * @memberof typingwars.ClientError
         * @static
         * @param {typingwars.IClientError=} [properties] Properties to set
         * @returns {typingwars.ClientError} ClientError instance
         */
        ClientError.create = function create(properties) {
            return new ClientError(properties);
        };

        /**
         * Encodes the specified ClientError message. Does not implicitly {@link typingwars.ClientError.verify|verify} messages.
         * @function encode
         * @memberof typingwars.ClientError
         * @static
         * @param {typingwars.IClientError} message ClientError message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ClientError.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.message != null && message.hasOwnProperty("message"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.message);
            return writer;
        };

        /**
         * Encodes the specified ClientError message, length delimited. Does not implicitly {@link typingwars.ClientError.verify|verify} messages.
         * @function encodeDelimited
         * @memberof typingwars.ClientError
         * @static
         * @param {typingwars.IClientError} message ClientError message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ClientError.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ClientError message from the specified reader or buffer.
         * @function decode
         * @memberof typingwars.ClientError
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {typingwars.ClientError} ClientError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ClientError.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.typingwars.ClientError();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.message = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ClientError message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof typingwars.ClientError
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {typingwars.ClientError} ClientError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ClientError.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ClientError message.
         * @function verify
         * @memberof typingwars.ClientError
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ClientError.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.message != null && message.hasOwnProperty("message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            return null;
        };

        /**
         * Creates a ClientError message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof typingwars.ClientError
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {typingwars.ClientError} ClientError
         */
        ClientError.fromObject = function fromObject(object) {
            if (object instanceof $root.typingwars.ClientError)
                return object;
            var message = new $root.typingwars.ClientError();
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from a ClientError message. Also converts values to other types if specified.
         * @function toObject
         * @memberof typingwars.ClientError
         * @static
         * @param {typingwars.ClientError} message ClientError
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ClientError.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.message = "";
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this ClientError to JSON.
         * @function toJSON
         * @memberof typingwars.ClientError
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ClientError.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ClientError;
    })();

    typingwars.CreateRoomRequest = (function() {

        /**
         * Properties of a CreateRoomRequest.
         * @memberof typingwars
         * @interface ICreateRoomRequest
         * @property {string|null} [username] CreateRoomRequest username
         */

        /**
         * Constructs a new CreateRoomRequest.
         * @memberof typingwars
         * @classdesc Represents a CreateRoomRequest.
         * @implements ICreateRoomRequest
         * @constructor
         * @param {typingwars.ICreateRoomRequest=} [properties] Properties to set
         */
        function CreateRoomRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CreateRoomRequest username.
         * @member {string} username
         * @memberof typingwars.CreateRoomRequest
         * @instance
         */
        CreateRoomRequest.prototype.username = "";

        /**
         * Creates a new CreateRoomRequest instance using the specified properties.
         * @function create
         * @memberof typingwars.CreateRoomRequest
         * @static
         * @param {typingwars.ICreateRoomRequest=} [properties] Properties to set
         * @returns {typingwars.CreateRoomRequest} CreateRoomRequest instance
         */
        CreateRoomRequest.create = function create(properties) {
            return new CreateRoomRequest(properties);
        };

        /**
         * Encodes the specified CreateRoomRequest message. Does not implicitly {@link typingwars.CreateRoomRequest.verify|verify} messages.
         * @function encode
         * @memberof typingwars.CreateRoomRequest
         * @static
         * @param {typingwars.ICreateRoomRequest} message CreateRoomRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CreateRoomRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.username != null && message.hasOwnProperty("username"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.username);
            return writer;
        };

        /**
         * Encodes the specified CreateRoomRequest message, length delimited. Does not implicitly {@link typingwars.CreateRoomRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof typingwars.CreateRoomRequest
         * @static
         * @param {typingwars.ICreateRoomRequest} message CreateRoomRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CreateRoomRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CreateRoomRequest message from the specified reader or buffer.
         * @function decode
         * @memberof typingwars.CreateRoomRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {typingwars.CreateRoomRequest} CreateRoomRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CreateRoomRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.typingwars.CreateRoomRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.username = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CreateRoomRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof typingwars.CreateRoomRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {typingwars.CreateRoomRequest} CreateRoomRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CreateRoomRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CreateRoomRequest message.
         * @function verify
         * @memberof typingwars.CreateRoomRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CreateRoomRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.username != null && message.hasOwnProperty("username"))
                if (!$util.isString(message.username))
                    return "username: string expected";
            return null;
        };

        /**
         * Creates a CreateRoomRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof typingwars.CreateRoomRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {typingwars.CreateRoomRequest} CreateRoomRequest
         */
        CreateRoomRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.typingwars.CreateRoomRequest)
                return object;
            var message = new $root.typingwars.CreateRoomRequest();
            if (object.username != null)
                message.username = String(object.username);
            return message;
        };

        /**
         * Creates a plain object from a CreateRoomRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof typingwars.CreateRoomRequest
         * @static
         * @param {typingwars.CreateRoomRequest} message CreateRoomRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CreateRoomRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.username = "";
            if (message.username != null && message.hasOwnProperty("username"))
                object.username = message.username;
            return object;
        };

        /**
         * Converts this CreateRoomRequest to JSON.
         * @function toJSON
         * @memberof typingwars.CreateRoomRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CreateRoomRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CreateRoomRequest;
    })();

    typingwars.JoinRoomRequest = (function() {

        /**
         * Properties of a JoinRoomRequest.
         * @memberof typingwars
         * @interface IJoinRoomRequest
         * @property {string|null} [username] JoinRoomRequest username
         * @property {string|null} [roomId] JoinRoomRequest roomId
         */

        /**
         * Constructs a new JoinRoomRequest.
         * @memberof typingwars
         * @classdesc Represents a JoinRoomRequest.
         * @implements IJoinRoomRequest
         * @constructor
         * @param {typingwars.IJoinRoomRequest=} [properties] Properties to set
         */
        function JoinRoomRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * JoinRoomRequest username.
         * @member {string} username
         * @memberof typingwars.JoinRoomRequest
         * @instance
         */
        JoinRoomRequest.prototype.username = "";

        /**
         * JoinRoomRequest roomId.
         * @member {string} roomId
         * @memberof typingwars.JoinRoomRequest
         * @instance
         */
        JoinRoomRequest.prototype.roomId = "";

        /**
         * Creates a new JoinRoomRequest instance using the specified properties.
         * @function create
         * @memberof typingwars.JoinRoomRequest
         * @static
         * @param {typingwars.IJoinRoomRequest=} [properties] Properties to set
         * @returns {typingwars.JoinRoomRequest} JoinRoomRequest instance
         */
        JoinRoomRequest.create = function create(properties) {
            return new JoinRoomRequest(properties);
        };

        /**
         * Encodes the specified JoinRoomRequest message. Does not implicitly {@link typingwars.JoinRoomRequest.verify|verify} messages.
         * @function encode
         * @memberof typingwars.JoinRoomRequest
         * @static
         * @param {typingwars.IJoinRoomRequest} message JoinRoomRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinRoomRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.username != null && message.hasOwnProperty("username"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.username);
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.roomId);
            return writer;
        };

        /**
         * Encodes the specified JoinRoomRequest message, length delimited. Does not implicitly {@link typingwars.JoinRoomRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof typingwars.JoinRoomRequest
         * @static
         * @param {typingwars.IJoinRoomRequest} message JoinRoomRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinRoomRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a JoinRoomRequest message from the specified reader or buffer.
         * @function decode
         * @memberof typingwars.JoinRoomRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {typingwars.JoinRoomRequest} JoinRoomRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinRoomRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.typingwars.JoinRoomRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.username = reader.string();
                    break;
                case 2:
                    message.roomId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a JoinRoomRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof typingwars.JoinRoomRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {typingwars.JoinRoomRequest} JoinRoomRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinRoomRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a JoinRoomRequest message.
         * @function verify
         * @memberof typingwars.JoinRoomRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        JoinRoomRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.username != null && message.hasOwnProperty("username"))
                if (!$util.isString(message.username))
                    return "username: string expected";
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                if (!$util.isString(message.roomId))
                    return "roomId: string expected";
            return null;
        };

        /**
         * Creates a JoinRoomRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof typingwars.JoinRoomRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {typingwars.JoinRoomRequest} JoinRoomRequest
         */
        JoinRoomRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.typingwars.JoinRoomRequest)
                return object;
            var message = new $root.typingwars.JoinRoomRequest();
            if (object.username != null)
                message.username = String(object.username);
            if (object.roomId != null)
                message.roomId = String(object.roomId);
            return message;
        };

        /**
         * Creates a plain object from a JoinRoomRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof typingwars.JoinRoomRequest
         * @static
         * @param {typingwars.JoinRoomRequest} message JoinRoomRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        JoinRoomRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.username = "";
                object.roomId = "";
            }
            if (message.username != null && message.hasOwnProperty("username"))
                object.username = message.username;
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                object.roomId = message.roomId;
            return object;
        };

        /**
         * Converts this JoinRoomRequest to JSON.
         * @function toJSON
         * @memberof typingwars.JoinRoomRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        JoinRoomRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return JoinRoomRequest;
    })();

    typingwars.Player = (function() {

        /**
         * Properties of a Player.
         * @memberof typingwars
         * @interface IPlayer
         * @property {string|null} [id] Player id
         * @property {string|null} [username] Player username
         */

        /**
         * Constructs a new Player.
         * @memberof typingwars
         * @classdesc Represents a Player.
         * @implements IPlayer
         * @constructor
         * @param {typingwars.IPlayer=} [properties] Properties to set
         */
        function Player(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Player id.
         * @member {string} id
         * @memberof typingwars.Player
         * @instance
         */
        Player.prototype.id = "";

        /**
         * Player username.
         * @member {string} username
         * @memberof typingwars.Player
         * @instance
         */
        Player.prototype.username = "";

        /**
         * Creates a new Player instance using the specified properties.
         * @function create
         * @memberof typingwars.Player
         * @static
         * @param {typingwars.IPlayer=} [properties] Properties to set
         * @returns {typingwars.Player} Player instance
         */
        Player.create = function create(properties) {
            return new Player(properties);
        };

        /**
         * Encodes the specified Player message. Does not implicitly {@link typingwars.Player.verify|verify} messages.
         * @function encode
         * @memberof typingwars.Player
         * @static
         * @param {typingwars.IPlayer} message Player message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Player.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.username != null && message.hasOwnProperty("username"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.username);
            return writer;
        };

        /**
         * Encodes the specified Player message, length delimited. Does not implicitly {@link typingwars.Player.verify|verify} messages.
         * @function encodeDelimited
         * @memberof typingwars.Player
         * @static
         * @param {typingwars.IPlayer} message Player message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Player.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Player message from the specified reader or buffer.
         * @function decode
         * @memberof typingwars.Player
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {typingwars.Player} Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Player.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.typingwars.Player();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.username = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Player message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof typingwars.Player
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {typingwars.Player} Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Player.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Player message.
         * @function verify
         * @memberof typingwars.Player
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Player.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.username != null && message.hasOwnProperty("username"))
                if (!$util.isString(message.username))
                    return "username: string expected";
            return null;
        };

        /**
         * Creates a Player message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof typingwars.Player
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {typingwars.Player} Player
         */
        Player.fromObject = function fromObject(object) {
            if (object instanceof $root.typingwars.Player)
                return object;
            var message = new $root.typingwars.Player();
            if (object.id != null)
                message.id = String(object.id);
            if (object.username != null)
                message.username = String(object.username);
            return message;
        };

        /**
         * Creates a plain object from a Player message. Also converts values to other types if specified.
         * @function toObject
         * @memberof typingwars.Player
         * @static
         * @param {typingwars.Player} message Player
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Player.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = "";
                object.username = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.username != null && message.hasOwnProperty("username"))
                object.username = message.username;
            return object;
        };

        /**
         * Converts this Player to JSON.
         * @function toJSON
         * @memberof typingwars.Player
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Player.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Player;
    })();

    typingwars.JoinRoomAck = (function() {

        /**
         * Properties of a JoinRoomAck.
         * @memberof typingwars
         * @interface IJoinRoomAck
         * @property {string|null} [clientId] JoinRoomAck clientId
         */

        /**
         * Constructs a new JoinRoomAck.
         * @memberof typingwars
         * @classdesc Represents a JoinRoomAck.
         * @implements IJoinRoomAck
         * @constructor
         * @param {typingwars.IJoinRoomAck=} [properties] Properties to set
         */
        function JoinRoomAck(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * JoinRoomAck clientId.
         * @member {string} clientId
         * @memberof typingwars.JoinRoomAck
         * @instance
         */
        JoinRoomAck.prototype.clientId = "";

        /**
         * Creates a new JoinRoomAck instance using the specified properties.
         * @function create
         * @memberof typingwars.JoinRoomAck
         * @static
         * @param {typingwars.IJoinRoomAck=} [properties] Properties to set
         * @returns {typingwars.JoinRoomAck} JoinRoomAck instance
         */
        JoinRoomAck.create = function create(properties) {
            return new JoinRoomAck(properties);
        };

        /**
         * Encodes the specified JoinRoomAck message. Does not implicitly {@link typingwars.JoinRoomAck.verify|verify} messages.
         * @function encode
         * @memberof typingwars.JoinRoomAck
         * @static
         * @param {typingwars.IJoinRoomAck} message JoinRoomAck message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinRoomAck.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.clientId != null && message.hasOwnProperty("clientId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.clientId);
            return writer;
        };

        /**
         * Encodes the specified JoinRoomAck message, length delimited. Does not implicitly {@link typingwars.JoinRoomAck.verify|verify} messages.
         * @function encodeDelimited
         * @memberof typingwars.JoinRoomAck
         * @static
         * @param {typingwars.IJoinRoomAck} message JoinRoomAck message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinRoomAck.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a JoinRoomAck message from the specified reader or buffer.
         * @function decode
         * @memberof typingwars.JoinRoomAck
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {typingwars.JoinRoomAck} JoinRoomAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinRoomAck.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.typingwars.JoinRoomAck();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.clientId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a JoinRoomAck message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof typingwars.JoinRoomAck
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {typingwars.JoinRoomAck} JoinRoomAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinRoomAck.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a JoinRoomAck message.
         * @function verify
         * @memberof typingwars.JoinRoomAck
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        JoinRoomAck.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.clientId != null && message.hasOwnProperty("clientId"))
                if (!$util.isString(message.clientId))
                    return "clientId: string expected";
            return null;
        };

        /**
         * Creates a JoinRoomAck message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof typingwars.JoinRoomAck
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {typingwars.JoinRoomAck} JoinRoomAck
         */
        JoinRoomAck.fromObject = function fromObject(object) {
            if (object instanceof $root.typingwars.JoinRoomAck)
                return object;
            var message = new $root.typingwars.JoinRoomAck();
            if (object.clientId != null)
                message.clientId = String(object.clientId);
            return message;
        };

        /**
         * Creates a plain object from a JoinRoomAck message. Also converts values to other types if specified.
         * @function toObject
         * @memberof typingwars.JoinRoomAck
         * @static
         * @param {typingwars.JoinRoomAck} message JoinRoomAck
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        JoinRoomAck.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.clientId = "";
            if (message.clientId != null && message.hasOwnProperty("clientId"))
                object.clientId = message.clientId;
            return object;
        };

        /**
         * Converts this JoinRoomAck to JSON.
         * @function toJSON
         * @memberof typingwars.JoinRoomAck
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        JoinRoomAck.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return JoinRoomAck;
    })();

    typingwars.PlayerStatus = (function() {

        /**
         * Properties of a PlayerStatus.
         * @memberof typingwars
         * @interface IPlayerStatus
         * @property {boolean|null} [ready] PlayerStatus ready
         * @property {number|null} [index] PlayerStatus index
         */

        /**
         * Constructs a new PlayerStatus.
         * @memberof typingwars
         * @classdesc Represents a PlayerStatus.
         * @implements IPlayerStatus
         * @constructor
         * @param {typingwars.IPlayerStatus=} [properties] Properties to set
         */
        function PlayerStatus(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerStatus ready.
         * @member {boolean} ready
         * @memberof typingwars.PlayerStatus
         * @instance
         */
        PlayerStatus.prototype.ready = false;

        /**
         * PlayerStatus index.
         * @member {number} index
         * @memberof typingwars.PlayerStatus
         * @instance
         */
        PlayerStatus.prototype.index = 0;

        /**
         * Creates a new PlayerStatus instance using the specified properties.
         * @function create
         * @memberof typingwars.PlayerStatus
         * @static
         * @param {typingwars.IPlayerStatus=} [properties] Properties to set
         * @returns {typingwars.PlayerStatus} PlayerStatus instance
         */
        PlayerStatus.create = function create(properties) {
            return new PlayerStatus(properties);
        };

        /**
         * Encodes the specified PlayerStatus message. Does not implicitly {@link typingwars.PlayerStatus.verify|verify} messages.
         * @function encode
         * @memberof typingwars.PlayerStatus
         * @static
         * @param {typingwars.IPlayerStatus} message PlayerStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerStatus.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.ready != null && message.hasOwnProperty("ready"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.ready);
            if (message.index != null && message.hasOwnProperty("index"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.index);
            return writer;
        };

        /**
         * Encodes the specified PlayerStatus message, length delimited. Does not implicitly {@link typingwars.PlayerStatus.verify|verify} messages.
         * @function encodeDelimited
         * @memberof typingwars.PlayerStatus
         * @static
         * @param {typingwars.IPlayerStatus} message PlayerStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerStatus.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerStatus message from the specified reader or buffer.
         * @function decode
         * @memberof typingwars.PlayerStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {typingwars.PlayerStatus} PlayerStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerStatus.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.typingwars.PlayerStatus();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.ready = reader.bool();
                    break;
                case 2:
                    message.index = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerStatus message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof typingwars.PlayerStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {typingwars.PlayerStatus} PlayerStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerStatus.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerStatus message.
         * @function verify
         * @memberof typingwars.PlayerStatus
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerStatus.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.ready != null && message.hasOwnProperty("ready"))
                if (typeof message.ready !== "boolean")
                    return "ready: boolean expected";
            if (message.index != null && message.hasOwnProperty("index"))
                if (!$util.isInteger(message.index))
                    return "index: integer expected";
            return null;
        };

        /**
         * Creates a PlayerStatus message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof typingwars.PlayerStatus
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {typingwars.PlayerStatus} PlayerStatus
         */
        PlayerStatus.fromObject = function fromObject(object) {
            if (object instanceof $root.typingwars.PlayerStatus)
                return object;
            var message = new $root.typingwars.PlayerStatus();
            if (object.ready != null)
                message.ready = Boolean(object.ready);
            if (object.index != null)
                message.index = object.index | 0;
            return message;
        };

        /**
         * Creates a plain object from a PlayerStatus message. Also converts values to other types if specified.
         * @function toObject
         * @memberof typingwars.PlayerStatus
         * @static
         * @param {typingwars.PlayerStatus} message PlayerStatus
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerStatus.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.ready = false;
                object.index = 0;
            }
            if (message.ready != null && message.hasOwnProperty("ready"))
                object.ready = message.ready;
            if (message.index != null && message.hasOwnProperty("index"))
                object.index = message.index;
            return object;
        };

        /**
         * Converts this PlayerStatus to JSON.
         * @function toJSON
         * @memberof typingwars.PlayerStatus
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerStatus.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PlayerStatus;
    })();

    typingwars.UpdateRoom = (function() {

        /**
         * Properties of an UpdateRoom.
         * @memberof typingwars
         * @interface IUpdateRoom
         * @property {string|null} [roomId] UpdateRoom roomId
         * @property {Object.<string,typingwars.IPlayer>|null} [players] UpdateRoom players
         * @property {Object.<string,typingwars.IPlayerStatus>|null} [playerStatuses] UpdateRoom playerStatuses
         * @property {boolean|null} [startFlag] UpdateRoom startFlag
         */

        /**
         * Constructs a new UpdateRoom.
         * @memberof typingwars
         * @classdesc Represents an UpdateRoom.
         * @implements IUpdateRoom
         * @constructor
         * @param {typingwars.IUpdateRoom=} [properties] Properties to set
         */
        function UpdateRoom(properties) {
            this.players = {};
            this.playerStatuses = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UpdateRoom roomId.
         * @member {string} roomId
         * @memberof typingwars.UpdateRoom
         * @instance
         */
        UpdateRoom.prototype.roomId = "";

        /**
         * UpdateRoom players.
         * @member {Object.<string,typingwars.IPlayer>} players
         * @memberof typingwars.UpdateRoom
         * @instance
         */
        UpdateRoom.prototype.players = $util.emptyObject;

        /**
         * UpdateRoom playerStatuses.
         * @member {Object.<string,typingwars.IPlayerStatus>} playerStatuses
         * @memberof typingwars.UpdateRoom
         * @instance
         */
        UpdateRoom.prototype.playerStatuses = $util.emptyObject;

        /**
         * UpdateRoom startFlag.
         * @member {boolean} startFlag
         * @memberof typingwars.UpdateRoom
         * @instance
         */
        UpdateRoom.prototype.startFlag = false;

        /**
         * Creates a new UpdateRoom instance using the specified properties.
         * @function create
         * @memberof typingwars.UpdateRoom
         * @static
         * @param {typingwars.IUpdateRoom=} [properties] Properties to set
         * @returns {typingwars.UpdateRoom} UpdateRoom instance
         */
        UpdateRoom.create = function create(properties) {
            return new UpdateRoom(properties);
        };

        /**
         * Encodes the specified UpdateRoom message. Does not implicitly {@link typingwars.UpdateRoom.verify|verify} messages.
         * @function encode
         * @memberof typingwars.UpdateRoom
         * @static
         * @param {typingwars.IUpdateRoom} message UpdateRoom message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UpdateRoom.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.roomId);
            if (message.players != null && message.hasOwnProperty("players"))
                for (var keys = Object.keys(message.players), i = 0; i < keys.length; ++i) {
                    writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                    $root.typingwars.Player.encode(message.players[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                }
            if (message.playerStatuses != null && message.hasOwnProperty("playerStatuses"))
                for (var keys = Object.keys(message.playerStatuses), i = 0; i < keys.length; ++i) {
                    writer.uint32(/* id 3, wireType 2 =*/26).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                    $root.typingwars.PlayerStatus.encode(message.playerStatuses[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                }
            if (message.startFlag != null && message.hasOwnProperty("startFlag"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.startFlag);
            return writer;
        };

        /**
         * Encodes the specified UpdateRoom message, length delimited. Does not implicitly {@link typingwars.UpdateRoom.verify|verify} messages.
         * @function encodeDelimited
         * @memberof typingwars.UpdateRoom
         * @static
         * @param {typingwars.IUpdateRoom} message UpdateRoom message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UpdateRoom.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an UpdateRoom message from the specified reader or buffer.
         * @function decode
         * @memberof typingwars.UpdateRoom
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {typingwars.UpdateRoom} UpdateRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UpdateRoom.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.typingwars.UpdateRoom(), key;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roomId = reader.string();
                    break;
                case 2:
                    reader.skip().pos++;
                    if (message.players === $util.emptyObject)
                        message.players = {};
                    key = reader.string();
                    reader.pos++;
                    message.players[key] = $root.typingwars.Player.decode(reader, reader.uint32());
                    break;
                case 3:
                    reader.skip().pos++;
                    if (message.playerStatuses === $util.emptyObject)
                        message.playerStatuses = {};
                    key = reader.string();
                    reader.pos++;
                    message.playerStatuses[key] = $root.typingwars.PlayerStatus.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.startFlag = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an UpdateRoom message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof typingwars.UpdateRoom
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {typingwars.UpdateRoom} UpdateRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UpdateRoom.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an UpdateRoom message.
         * @function verify
         * @memberof typingwars.UpdateRoom
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UpdateRoom.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                if (!$util.isString(message.roomId))
                    return "roomId: string expected";
            if (message.players != null && message.hasOwnProperty("players")) {
                if (!$util.isObject(message.players))
                    return "players: object expected";
                var key = Object.keys(message.players);
                for (var i = 0; i < key.length; ++i) {
                    var error = $root.typingwars.Player.verify(message.players[key[i]]);
                    if (error)
                        return "players." + error;
                }
            }
            if (message.playerStatuses != null && message.hasOwnProperty("playerStatuses")) {
                if (!$util.isObject(message.playerStatuses))
                    return "playerStatuses: object expected";
                var key = Object.keys(message.playerStatuses);
                for (var i = 0; i < key.length; ++i) {
                    var error = $root.typingwars.PlayerStatus.verify(message.playerStatuses[key[i]]);
                    if (error)
                        return "playerStatuses." + error;
                }
            }
            if (message.startFlag != null && message.hasOwnProperty("startFlag"))
                if (typeof message.startFlag !== "boolean")
                    return "startFlag: boolean expected";
            return null;
        };

        /**
         * Creates an UpdateRoom message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof typingwars.UpdateRoom
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {typingwars.UpdateRoom} UpdateRoom
         */
        UpdateRoom.fromObject = function fromObject(object) {
            if (object instanceof $root.typingwars.UpdateRoom)
                return object;
            var message = new $root.typingwars.UpdateRoom();
            if (object.roomId != null)
                message.roomId = String(object.roomId);
            if (object.players) {
                if (typeof object.players !== "object")
                    throw TypeError(".typingwars.UpdateRoom.players: object expected");
                message.players = {};
                for (var keys = Object.keys(object.players), i = 0; i < keys.length; ++i) {
                    if (typeof object.players[keys[i]] !== "object")
                        throw TypeError(".typingwars.UpdateRoom.players: object expected");
                    message.players[keys[i]] = $root.typingwars.Player.fromObject(object.players[keys[i]]);
                }
            }
            if (object.playerStatuses) {
                if (typeof object.playerStatuses !== "object")
                    throw TypeError(".typingwars.UpdateRoom.playerStatuses: object expected");
                message.playerStatuses = {};
                for (var keys = Object.keys(object.playerStatuses), i = 0; i < keys.length; ++i) {
                    if (typeof object.playerStatuses[keys[i]] !== "object")
                        throw TypeError(".typingwars.UpdateRoom.playerStatuses: object expected");
                    message.playerStatuses[keys[i]] = $root.typingwars.PlayerStatus.fromObject(object.playerStatuses[keys[i]]);
                }
            }
            if (object.startFlag != null)
                message.startFlag = Boolean(object.startFlag);
            return message;
        };

        /**
         * Creates a plain object from an UpdateRoom message. Also converts values to other types if specified.
         * @function toObject
         * @memberof typingwars.UpdateRoom
         * @static
         * @param {typingwars.UpdateRoom} message UpdateRoom
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UpdateRoom.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.objects || options.defaults) {
                object.players = {};
                object.playerStatuses = {};
            }
            if (options.defaults) {
                object.roomId = "";
                object.startFlag = false;
            }
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                object.roomId = message.roomId;
            var keys2;
            if (message.players && (keys2 = Object.keys(message.players)).length) {
                object.players = {};
                for (var j = 0; j < keys2.length; ++j)
                    object.players[keys2[j]] = $root.typingwars.Player.toObject(message.players[keys2[j]], options);
            }
            if (message.playerStatuses && (keys2 = Object.keys(message.playerStatuses)).length) {
                object.playerStatuses = {};
                for (var j = 0; j < keys2.length; ++j)
                    object.playerStatuses[keys2[j]] = $root.typingwars.PlayerStatus.toObject(message.playerStatuses[keys2[j]], options);
            }
            if (message.startFlag != null && message.hasOwnProperty("startFlag"))
                object.startFlag = message.startFlag;
            return object;
        };

        /**
         * Converts this UpdateRoom to JSON.
         * @function toJSON
         * @memberof typingwars.UpdateRoom
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UpdateRoom.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UpdateRoom;
    })();

    typingwars.UpdatePlayerReady = (function() {

        /**
         * Properties of an UpdatePlayerReady.
         * @memberof typingwars
         * @interface IUpdatePlayerReady
         * @property {boolean|null} [readyStatus] UpdatePlayerReady readyStatus
         */

        /**
         * Constructs a new UpdatePlayerReady.
         * @memberof typingwars
         * @classdesc Represents an UpdatePlayerReady.
         * @implements IUpdatePlayerReady
         * @constructor
         * @param {typingwars.IUpdatePlayerReady=} [properties] Properties to set
         */
        function UpdatePlayerReady(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UpdatePlayerReady readyStatus.
         * @member {boolean} readyStatus
         * @memberof typingwars.UpdatePlayerReady
         * @instance
         */
        UpdatePlayerReady.prototype.readyStatus = false;

        /**
         * Creates a new UpdatePlayerReady instance using the specified properties.
         * @function create
         * @memberof typingwars.UpdatePlayerReady
         * @static
         * @param {typingwars.IUpdatePlayerReady=} [properties] Properties to set
         * @returns {typingwars.UpdatePlayerReady} UpdatePlayerReady instance
         */
        UpdatePlayerReady.create = function create(properties) {
            return new UpdatePlayerReady(properties);
        };

        /**
         * Encodes the specified UpdatePlayerReady message. Does not implicitly {@link typingwars.UpdatePlayerReady.verify|verify} messages.
         * @function encode
         * @memberof typingwars.UpdatePlayerReady
         * @static
         * @param {typingwars.IUpdatePlayerReady} message UpdatePlayerReady message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UpdatePlayerReady.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.readyStatus != null && message.hasOwnProperty("readyStatus"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.readyStatus);
            return writer;
        };

        /**
         * Encodes the specified UpdatePlayerReady message, length delimited. Does not implicitly {@link typingwars.UpdatePlayerReady.verify|verify} messages.
         * @function encodeDelimited
         * @memberof typingwars.UpdatePlayerReady
         * @static
         * @param {typingwars.IUpdatePlayerReady} message UpdatePlayerReady message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UpdatePlayerReady.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an UpdatePlayerReady message from the specified reader or buffer.
         * @function decode
         * @memberof typingwars.UpdatePlayerReady
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {typingwars.UpdatePlayerReady} UpdatePlayerReady
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UpdatePlayerReady.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.typingwars.UpdatePlayerReady();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 2:
                    message.readyStatus = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an UpdatePlayerReady message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof typingwars.UpdatePlayerReady
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {typingwars.UpdatePlayerReady} UpdatePlayerReady
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UpdatePlayerReady.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an UpdatePlayerReady message.
         * @function verify
         * @memberof typingwars.UpdatePlayerReady
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UpdatePlayerReady.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.readyStatus != null && message.hasOwnProperty("readyStatus"))
                if (typeof message.readyStatus !== "boolean")
                    return "readyStatus: boolean expected";
            return null;
        };

        /**
         * Creates an UpdatePlayerReady message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof typingwars.UpdatePlayerReady
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {typingwars.UpdatePlayerReady} UpdatePlayerReady
         */
        UpdatePlayerReady.fromObject = function fromObject(object) {
            if (object instanceof $root.typingwars.UpdatePlayerReady)
                return object;
            var message = new $root.typingwars.UpdatePlayerReady();
            if (object.readyStatus != null)
                message.readyStatus = Boolean(object.readyStatus);
            return message;
        };

        /**
         * Creates a plain object from an UpdatePlayerReady message. Also converts values to other types if specified.
         * @function toObject
         * @memberof typingwars.UpdatePlayerReady
         * @static
         * @param {typingwars.UpdatePlayerReady} message UpdatePlayerReady
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UpdatePlayerReady.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.readyStatus = false;
            if (message.readyStatus != null && message.hasOwnProperty("readyStatus"))
                object.readyStatus = message.readyStatus;
            return object;
        };

        /**
         * Converts this UpdatePlayerReady to JSON.
         * @function toJSON
         * @memberof typingwars.UpdatePlayerReady
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UpdatePlayerReady.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UpdatePlayerReady;
    })();

    typingwars.StartGameRequest = (function() {

        /**
         * Properties of a StartGameRequest.
         * @memberof typingwars
         * @interface IStartGameRequest
         */

        /**
         * Constructs a new StartGameRequest.
         * @memberof typingwars
         * @classdesc Represents a StartGameRequest.
         * @implements IStartGameRequest
         * @constructor
         * @param {typingwars.IStartGameRequest=} [properties] Properties to set
         */
        function StartGameRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new StartGameRequest instance using the specified properties.
         * @function create
         * @memberof typingwars.StartGameRequest
         * @static
         * @param {typingwars.IStartGameRequest=} [properties] Properties to set
         * @returns {typingwars.StartGameRequest} StartGameRequest instance
         */
        StartGameRequest.create = function create(properties) {
            return new StartGameRequest(properties);
        };

        /**
         * Encodes the specified StartGameRequest message. Does not implicitly {@link typingwars.StartGameRequest.verify|verify} messages.
         * @function encode
         * @memberof typingwars.StartGameRequest
         * @static
         * @param {typingwars.IStartGameRequest} message StartGameRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StartGameRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified StartGameRequest message, length delimited. Does not implicitly {@link typingwars.StartGameRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof typingwars.StartGameRequest
         * @static
         * @param {typingwars.IStartGameRequest} message StartGameRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StartGameRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a StartGameRequest message from the specified reader or buffer.
         * @function decode
         * @memberof typingwars.StartGameRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {typingwars.StartGameRequest} StartGameRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StartGameRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.typingwars.StartGameRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a StartGameRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof typingwars.StartGameRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {typingwars.StartGameRequest} StartGameRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StartGameRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StartGameRequest message.
         * @function verify
         * @memberof typingwars.StartGameRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        StartGameRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a StartGameRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof typingwars.StartGameRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {typingwars.StartGameRequest} StartGameRequest
         */
        StartGameRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.typingwars.StartGameRequest)
                return object;
            return new $root.typingwars.StartGameRequest();
        };

        /**
         * Creates a plain object from a StartGameRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof typingwars.StartGameRequest
         * @static
         * @param {typingwars.StartGameRequest} message StartGameRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StartGameRequest.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this StartGameRequest to JSON.
         * @function toJSON
         * @memberof typingwars.StartGameRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StartGameRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return StartGameRequest;
    })();

    typingwars.StartGameAck = (function() {

        /**
         * Properties of a StartGameAck.
         * @memberof typingwars
         * @interface IStartGameAck
         */

        /**
         * Constructs a new StartGameAck.
         * @memberof typingwars
         * @classdesc Represents a StartGameAck.
         * @implements IStartGameAck
         * @constructor
         * @param {typingwars.IStartGameAck=} [properties] Properties to set
         */
        function StartGameAck(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new StartGameAck instance using the specified properties.
         * @function create
         * @memberof typingwars.StartGameAck
         * @static
         * @param {typingwars.IStartGameAck=} [properties] Properties to set
         * @returns {typingwars.StartGameAck} StartGameAck instance
         */
        StartGameAck.create = function create(properties) {
            return new StartGameAck(properties);
        };

        /**
         * Encodes the specified StartGameAck message. Does not implicitly {@link typingwars.StartGameAck.verify|verify} messages.
         * @function encode
         * @memberof typingwars.StartGameAck
         * @static
         * @param {typingwars.IStartGameAck} message StartGameAck message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StartGameAck.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified StartGameAck message, length delimited. Does not implicitly {@link typingwars.StartGameAck.verify|verify} messages.
         * @function encodeDelimited
         * @memberof typingwars.StartGameAck
         * @static
         * @param {typingwars.IStartGameAck} message StartGameAck message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StartGameAck.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a StartGameAck message from the specified reader or buffer.
         * @function decode
         * @memberof typingwars.StartGameAck
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {typingwars.StartGameAck} StartGameAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StartGameAck.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.typingwars.StartGameAck();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a StartGameAck message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof typingwars.StartGameAck
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {typingwars.StartGameAck} StartGameAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StartGameAck.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StartGameAck message.
         * @function verify
         * @memberof typingwars.StartGameAck
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        StartGameAck.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a StartGameAck message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof typingwars.StartGameAck
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {typingwars.StartGameAck} StartGameAck
         */
        StartGameAck.fromObject = function fromObject(object) {
            if (object instanceof $root.typingwars.StartGameAck)
                return object;
            return new $root.typingwars.StartGameAck();
        };

        /**
         * Creates a plain object from a StartGameAck message. Also converts values to other types if specified.
         * @function toObject
         * @memberof typingwars.StartGameAck
         * @static
         * @param {typingwars.StartGameAck} message StartGameAck
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StartGameAck.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this StartGameAck to JSON.
         * @function toJSON
         * @memberof typingwars.StartGameAck
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StartGameAck.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return StartGameAck;
    })();

    typingwars.Point = (function() {

        /**
         * Properties of a Point.
         * @memberof typingwars
         * @interface IPoint
         * @property {number|null} [x] Point x
         * @property {number|null} [y] Point y
         */

        /**
         * Constructs a new Point.
         * @memberof typingwars
         * @classdesc Represents a Point.
         * @implements IPoint
         * @constructor
         * @param {typingwars.IPoint=} [properties] Properties to set
         */
        function Point(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Point x.
         * @member {number} x
         * @memberof typingwars.Point
         * @instance
         */
        Point.prototype.x = 0;

        /**
         * Point y.
         * @member {number} y
         * @memberof typingwars.Point
         * @instance
         */
        Point.prototype.y = 0;

        /**
         * Creates a new Point instance using the specified properties.
         * @function create
         * @memberof typingwars.Point
         * @static
         * @param {typingwars.IPoint=} [properties] Properties to set
         * @returns {typingwars.Point} Point instance
         */
        Point.create = function create(properties) {
            return new Point(properties);
        };

        /**
         * Encodes the specified Point message. Does not implicitly {@link typingwars.Point.verify|verify} messages.
         * @function encode
         * @memberof typingwars.Point
         * @static
         * @param {typingwars.IPoint} message Point message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Point.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.x != null && message.hasOwnProperty("x"))
                writer.uint32(/* id 1, wireType 5 =*/13).float(message.x);
            if (message.y != null && message.hasOwnProperty("y"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.y);
            return writer;
        };

        /**
         * Encodes the specified Point message, length delimited. Does not implicitly {@link typingwars.Point.verify|verify} messages.
         * @function encodeDelimited
         * @memberof typingwars.Point
         * @static
         * @param {typingwars.IPoint} message Point message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Point.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Point message from the specified reader or buffer.
         * @function decode
         * @memberof typingwars.Point
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {typingwars.Point} Point
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Point.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.typingwars.Point();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.x = reader.float();
                    break;
                case 2:
                    message.y = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Point message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof typingwars.Point
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {typingwars.Point} Point
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Point.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Point message.
         * @function verify
         * @memberof typingwars.Point
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Point.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (typeof message.x !== "number")
                    return "x: number expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (typeof message.y !== "number")
                    return "y: number expected";
            return null;
        };

        /**
         * Creates a Point message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof typingwars.Point
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {typingwars.Point} Point
         */
        Point.fromObject = function fromObject(object) {
            if (object instanceof $root.typingwars.Point)
                return object;
            var message = new $root.typingwars.Point();
            if (object.x != null)
                message.x = Number(object.x);
            if (object.y != null)
                message.y = Number(object.y);
            return message;
        };

        /**
         * Creates a plain object from a Point message. Also converts values to other types if specified.
         * @function toObject
         * @memberof typingwars.Point
         * @static
         * @param {typingwars.Point} message Point
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Point.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.x = 0;
                object.y = 0;
            }
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
            return object;
        };

        /**
         * Converts this Point to JSON.
         * @function toJSON
         * @memberof typingwars.Point
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Point.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Point;
    })();

    typingwars.Base = (function() {

        /**
         * Properties of a Base.
         * @memberof typingwars
         * @interface IBase
         * @property {string|null} [owner] Base owner
         * @property {number|null} [size] Base size
         * @property {number|null} [hp] Base hp
         * @property {string|null} [colour] Base colour
         * @property {typingwars.IPoint|null} [position] Base position
         */

        /**
         * Constructs a new Base.
         * @memberof typingwars
         * @classdesc Represents a Base.
         * @implements IBase
         * @constructor
         * @param {typingwars.IBase=} [properties] Properties to set
         */
        function Base(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Base owner.
         * @member {string} owner
         * @memberof typingwars.Base
         * @instance
         */
        Base.prototype.owner = "";

        /**
         * Base size.
         * @member {number} size
         * @memberof typingwars.Base
         * @instance
         */
        Base.prototype.size = 0;

        /**
         * Base hp.
         * @member {number} hp
         * @memberof typingwars.Base
         * @instance
         */
        Base.prototype.hp = 0;

        /**
         * Base colour.
         * @member {string} colour
         * @memberof typingwars.Base
         * @instance
         */
        Base.prototype.colour = "";

        /**
         * Base position.
         * @member {typingwars.IPoint|null|undefined} position
         * @memberof typingwars.Base
         * @instance
         */
        Base.prototype.position = null;

        /**
         * Creates a new Base instance using the specified properties.
         * @function create
         * @memberof typingwars.Base
         * @static
         * @param {typingwars.IBase=} [properties] Properties to set
         * @returns {typingwars.Base} Base instance
         */
        Base.create = function create(properties) {
            return new Base(properties);
        };

        /**
         * Encodes the specified Base message. Does not implicitly {@link typingwars.Base.verify|verify} messages.
         * @function encode
         * @memberof typingwars.Base
         * @static
         * @param {typingwars.IBase} message Base message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Base.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.owner != null && message.hasOwnProperty("owner"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.owner);
            if (message.size != null && message.hasOwnProperty("size"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.size);
            if (message.hp != null && message.hasOwnProperty("hp"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.hp);
            if (message.colour != null && message.hasOwnProperty("colour"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.colour);
            if (message.position != null && message.hasOwnProperty("position"))
                $root.typingwars.Point.encode(message.position, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Base message, length delimited. Does not implicitly {@link typingwars.Base.verify|verify} messages.
         * @function encodeDelimited
         * @memberof typingwars.Base
         * @static
         * @param {typingwars.IBase} message Base message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Base.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Base message from the specified reader or buffer.
         * @function decode
         * @memberof typingwars.Base
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {typingwars.Base} Base
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Base.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.typingwars.Base();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.owner = reader.string();
                    break;
                case 2:
                    message.size = reader.uint32();
                    break;
                case 3:
                    message.hp = reader.int32();
                    break;
                case 4:
                    message.colour = reader.string();
                    break;
                case 5:
                    message.position = $root.typingwars.Point.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Base message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof typingwars.Base
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {typingwars.Base} Base
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Base.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Base message.
         * @function verify
         * @memberof typingwars.Base
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Base.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.owner != null && message.hasOwnProperty("owner"))
                if (!$util.isString(message.owner))
                    return "owner: string expected";
            if (message.size != null && message.hasOwnProperty("size"))
                if (!$util.isInteger(message.size))
                    return "size: integer expected";
            if (message.hp != null && message.hasOwnProperty("hp"))
                if (!$util.isInteger(message.hp))
                    return "hp: integer expected";
            if (message.colour != null && message.hasOwnProperty("colour"))
                if (!$util.isString(message.colour))
                    return "colour: string expected";
            if (message.position != null && message.hasOwnProperty("position")) {
                var error = $root.typingwars.Point.verify(message.position);
                if (error)
                    return "position." + error;
            }
            return null;
        };

        /**
         * Creates a Base message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof typingwars.Base
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {typingwars.Base} Base
         */
        Base.fromObject = function fromObject(object) {
            if (object instanceof $root.typingwars.Base)
                return object;
            var message = new $root.typingwars.Base();
            if (object.owner != null)
                message.owner = String(object.owner);
            if (object.size != null)
                message.size = object.size >>> 0;
            if (object.hp != null)
                message.hp = object.hp | 0;
            if (object.colour != null)
                message.colour = String(object.colour);
            if (object.position != null) {
                if (typeof object.position !== "object")
                    throw TypeError(".typingwars.Base.position: object expected");
                message.position = $root.typingwars.Point.fromObject(object.position);
            }
            return message;
        };

        /**
         * Creates a plain object from a Base message. Also converts values to other types if specified.
         * @function toObject
         * @memberof typingwars.Base
         * @static
         * @param {typingwars.Base} message Base
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Base.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.owner = "";
                object.size = 0;
                object.hp = 0;
                object.colour = "";
                object.position = null;
            }
            if (message.owner != null && message.hasOwnProperty("owner"))
                object.owner = message.owner;
            if (message.size != null && message.hasOwnProperty("size"))
                object.size = message.size;
            if (message.hp != null && message.hasOwnProperty("hp"))
                object.hp = message.hp;
            if (message.colour != null && message.hasOwnProperty("colour"))
                object.colour = message.colour;
            if (message.position != null && message.hasOwnProperty("position"))
                object.position = $root.typingwars.Point.toObject(message.position, options);
            return object;
        };

        /**
         * Converts this Base to JSON.
         * @function toJSON
         * @memberof typingwars.Base
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Base.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Base;
    })();

    typingwars.Unit = (function() {

        /**
         * Properties of an Unit.
         * @memberof typingwars
         * @interface IUnit
         * @property {string|null} [owner] Unit owner
         * @property {string|null} [word] Unit word
         * @property {number|null} [typed] Unit typed
         * @property {number|null} [speed] Unit speed
         * @property {typingwars.IPoint|null} [position] Unit position
         * @property {number|null} [size] Unit size
         * @property {typingwars.IBase|null} [target] Unit target
         */

        /**
         * Constructs a new Unit.
         * @memberof typingwars
         * @classdesc Represents an Unit.
         * @implements IUnit
         * @constructor
         * @param {typingwars.IUnit=} [properties] Properties to set
         */
        function Unit(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Unit owner.
         * @member {string} owner
         * @memberof typingwars.Unit
         * @instance
         */
        Unit.prototype.owner = "";

        /**
         * Unit word.
         * @member {string} word
         * @memberof typingwars.Unit
         * @instance
         */
        Unit.prototype.word = "";

        /**
         * Unit typed.
         * @member {number} typed
         * @memberof typingwars.Unit
         * @instance
         */
        Unit.prototype.typed = 0;

        /**
         * Unit speed.
         * @member {number} speed
         * @memberof typingwars.Unit
         * @instance
         */
        Unit.prototype.speed = 0;

        /**
         * Unit position.
         * @member {typingwars.IPoint|null|undefined} position
         * @memberof typingwars.Unit
         * @instance
         */
        Unit.prototype.position = null;

        /**
         * Unit size.
         * @member {number} size
         * @memberof typingwars.Unit
         * @instance
         */
        Unit.prototype.size = 0;

        /**
         * Unit target.
         * @member {typingwars.IBase|null|undefined} target
         * @memberof typingwars.Unit
         * @instance
         */
        Unit.prototype.target = null;

        /**
         * Creates a new Unit instance using the specified properties.
         * @function create
         * @memberof typingwars.Unit
         * @static
         * @param {typingwars.IUnit=} [properties] Properties to set
         * @returns {typingwars.Unit} Unit instance
         */
        Unit.create = function create(properties) {
            return new Unit(properties);
        };

        /**
         * Encodes the specified Unit message. Does not implicitly {@link typingwars.Unit.verify|verify} messages.
         * @function encode
         * @memberof typingwars.Unit
         * @static
         * @param {typingwars.IUnit} message Unit message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Unit.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.owner != null && message.hasOwnProperty("owner"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.owner);
            if (message.word != null && message.hasOwnProperty("word"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.word);
            if (message.typed != null && message.hasOwnProperty("typed"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.typed);
            if (message.speed != null && message.hasOwnProperty("speed"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.speed);
            if (message.position != null && message.hasOwnProperty("position"))
                $root.typingwars.Point.encode(message.position, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.size != null && message.hasOwnProperty("size"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.size);
            if (message.target != null && message.hasOwnProperty("target"))
                $root.typingwars.Base.encode(message.target, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Unit message, length delimited. Does not implicitly {@link typingwars.Unit.verify|verify} messages.
         * @function encodeDelimited
         * @memberof typingwars.Unit
         * @static
         * @param {typingwars.IUnit} message Unit message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Unit.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Unit message from the specified reader or buffer.
         * @function decode
         * @memberof typingwars.Unit
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {typingwars.Unit} Unit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Unit.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.typingwars.Unit();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.owner = reader.string();
                    break;
                case 2:
                    message.word = reader.string();
                    break;
                case 3:
                    message.typed = reader.uint32();
                    break;
                case 4:
                    message.speed = reader.float();
                    break;
                case 5:
                    message.position = $root.typingwars.Point.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.size = reader.uint32();
                    break;
                case 7:
                    message.target = $root.typingwars.Base.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Unit message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof typingwars.Unit
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {typingwars.Unit} Unit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Unit.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Unit message.
         * @function verify
         * @memberof typingwars.Unit
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Unit.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.owner != null && message.hasOwnProperty("owner"))
                if (!$util.isString(message.owner))
                    return "owner: string expected";
            if (message.word != null && message.hasOwnProperty("word"))
                if (!$util.isString(message.word))
                    return "word: string expected";
            if (message.typed != null && message.hasOwnProperty("typed"))
                if (!$util.isInteger(message.typed))
                    return "typed: integer expected";
            if (message.speed != null && message.hasOwnProperty("speed"))
                if (typeof message.speed !== "number")
                    return "speed: number expected";
            if (message.position != null && message.hasOwnProperty("position")) {
                var error = $root.typingwars.Point.verify(message.position);
                if (error)
                    return "position." + error;
            }
            if (message.size != null && message.hasOwnProperty("size"))
                if (!$util.isInteger(message.size))
                    return "size: integer expected";
            if (message.target != null && message.hasOwnProperty("target")) {
                var error = $root.typingwars.Base.verify(message.target);
                if (error)
                    return "target." + error;
            }
            return null;
        };

        /**
         * Creates an Unit message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof typingwars.Unit
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {typingwars.Unit} Unit
         */
        Unit.fromObject = function fromObject(object) {
            if (object instanceof $root.typingwars.Unit)
                return object;
            var message = new $root.typingwars.Unit();
            if (object.owner != null)
                message.owner = String(object.owner);
            if (object.word != null)
                message.word = String(object.word);
            if (object.typed != null)
                message.typed = object.typed >>> 0;
            if (object.speed != null)
                message.speed = Number(object.speed);
            if (object.position != null) {
                if (typeof object.position !== "object")
                    throw TypeError(".typingwars.Unit.position: object expected");
                message.position = $root.typingwars.Point.fromObject(object.position);
            }
            if (object.size != null)
                message.size = object.size >>> 0;
            if (object.target != null) {
                if (typeof object.target !== "object")
                    throw TypeError(".typingwars.Unit.target: object expected");
                message.target = $root.typingwars.Base.fromObject(object.target);
            }
            return message;
        };

        /**
         * Creates a plain object from an Unit message. Also converts values to other types if specified.
         * @function toObject
         * @memberof typingwars.Unit
         * @static
         * @param {typingwars.Unit} message Unit
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Unit.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.owner = "";
                object.word = "";
                object.typed = 0;
                object.speed = 0;
                object.position = null;
                object.size = 0;
                object.target = null;
            }
            if (message.owner != null && message.hasOwnProperty("owner"))
                object.owner = message.owner;
            if (message.word != null && message.hasOwnProperty("word"))
                object.word = message.word;
            if (message.typed != null && message.hasOwnProperty("typed"))
                object.typed = message.typed;
            if (message.speed != null && message.hasOwnProperty("speed"))
                object.speed = options.json && !isFinite(message.speed) ? String(message.speed) : message.speed;
            if (message.position != null && message.hasOwnProperty("position"))
                object.position = $root.typingwars.Point.toObject(message.position, options);
            if (message.size != null && message.hasOwnProperty("size"))
                object.size = message.size;
            if (message.target != null && message.hasOwnProperty("target"))
                object.target = $root.typingwars.Base.toObject(message.target, options);
            return object;
        };

        /**
         * Converts this Unit to JSON.
         * @function toJSON
         * @memberof typingwars.Unit
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Unit.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Unit;
    })();

    typingwars.Space = (function() {

        /**
         * Properties of a Space.
         * @memberof typingwars
         * @interface ISpace
         * @property {Array.<typingwars.IBase>|null} [bases] Space bases
         * @property {Array.<typingwars.IUnit>|null} [units] Space units
         * @property {Object.<string,typingwars.IUnit>|null} [targets] Space targets
         */

        /**
         * Constructs a new Space.
         * @memberof typingwars
         * @classdesc Represents a Space.
         * @implements ISpace
         * @constructor
         * @param {typingwars.ISpace=} [properties] Properties to set
         */
        function Space(properties) {
            this.bases = [];
            this.units = [];
            this.targets = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Space bases.
         * @member {Array.<typingwars.IBase>} bases
         * @memberof typingwars.Space
         * @instance
         */
        Space.prototype.bases = $util.emptyArray;

        /**
         * Space units.
         * @member {Array.<typingwars.IUnit>} units
         * @memberof typingwars.Space
         * @instance
         */
        Space.prototype.units = $util.emptyArray;

        /**
         * Space targets.
         * @member {Object.<string,typingwars.IUnit>} targets
         * @memberof typingwars.Space
         * @instance
         */
        Space.prototype.targets = $util.emptyObject;

        /**
         * Creates a new Space instance using the specified properties.
         * @function create
         * @memberof typingwars.Space
         * @static
         * @param {typingwars.ISpace=} [properties] Properties to set
         * @returns {typingwars.Space} Space instance
         */
        Space.create = function create(properties) {
            return new Space(properties);
        };

        /**
         * Encodes the specified Space message. Does not implicitly {@link typingwars.Space.verify|verify} messages.
         * @function encode
         * @memberof typingwars.Space
         * @static
         * @param {typingwars.ISpace} message Space message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Space.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.bases != null && message.bases.length)
                for (var i = 0; i < message.bases.length; ++i)
                    $root.typingwars.Base.encode(message.bases[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.units != null && message.units.length)
                for (var i = 0; i < message.units.length; ++i)
                    $root.typingwars.Unit.encode(message.units[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.targets != null && message.hasOwnProperty("targets"))
                for (var keys = Object.keys(message.targets), i = 0; i < keys.length; ++i) {
                    writer.uint32(/* id 3, wireType 2 =*/26).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                    $root.typingwars.Unit.encode(message.targets[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                }
            return writer;
        };

        /**
         * Encodes the specified Space message, length delimited. Does not implicitly {@link typingwars.Space.verify|verify} messages.
         * @function encodeDelimited
         * @memberof typingwars.Space
         * @static
         * @param {typingwars.ISpace} message Space message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Space.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Space message from the specified reader or buffer.
         * @function decode
         * @memberof typingwars.Space
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {typingwars.Space} Space
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Space.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.typingwars.Space(), key;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.bases && message.bases.length))
                        message.bases = [];
                    message.bases.push($root.typingwars.Base.decode(reader, reader.uint32()));
                    break;
                case 2:
                    if (!(message.units && message.units.length))
                        message.units = [];
                    message.units.push($root.typingwars.Unit.decode(reader, reader.uint32()));
                    break;
                case 3:
                    reader.skip().pos++;
                    if (message.targets === $util.emptyObject)
                        message.targets = {};
                    key = reader.string();
                    reader.pos++;
                    message.targets[key] = $root.typingwars.Unit.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Space message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof typingwars.Space
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {typingwars.Space} Space
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Space.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Space message.
         * @function verify
         * @memberof typingwars.Space
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Space.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.bases != null && message.hasOwnProperty("bases")) {
                if (!Array.isArray(message.bases))
                    return "bases: array expected";
                for (var i = 0; i < message.bases.length; ++i) {
                    var error = $root.typingwars.Base.verify(message.bases[i]);
                    if (error)
                        return "bases." + error;
                }
            }
            if (message.units != null && message.hasOwnProperty("units")) {
                if (!Array.isArray(message.units))
                    return "units: array expected";
                for (var i = 0; i < message.units.length; ++i) {
                    var error = $root.typingwars.Unit.verify(message.units[i]);
                    if (error)
                        return "units." + error;
                }
            }
            if (message.targets != null && message.hasOwnProperty("targets")) {
                if (!$util.isObject(message.targets))
                    return "targets: object expected";
                var key = Object.keys(message.targets);
                for (var i = 0; i < key.length; ++i) {
                    var error = $root.typingwars.Unit.verify(message.targets[key[i]]);
                    if (error)
                        return "targets." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Space message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof typingwars.Space
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {typingwars.Space} Space
         */
        Space.fromObject = function fromObject(object) {
            if (object instanceof $root.typingwars.Space)
                return object;
            var message = new $root.typingwars.Space();
            if (object.bases) {
                if (!Array.isArray(object.bases))
                    throw TypeError(".typingwars.Space.bases: array expected");
                message.bases = [];
                for (var i = 0; i < object.bases.length; ++i) {
                    if (typeof object.bases[i] !== "object")
                        throw TypeError(".typingwars.Space.bases: object expected");
                    message.bases[i] = $root.typingwars.Base.fromObject(object.bases[i]);
                }
            }
            if (object.units) {
                if (!Array.isArray(object.units))
                    throw TypeError(".typingwars.Space.units: array expected");
                message.units = [];
                for (var i = 0; i < object.units.length; ++i) {
                    if (typeof object.units[i] !== "object")
                        throw TypeError(".typingwars.Space.units: object expected");
                    message.units[i] = $root.typingwars.Unit.fromObject(object.units[i]);
                }
            }
            if (object.targets) {
                if (typeof object.targets !== "object")
                    throw TypeError(".typingwars.Space.targets: object expected");
                message.targets = {};
                for (var keys = Object.keys(object.targets), i = 0; i < keys.length; ++i) {
                    if (typeof object.targets[keys[i]] !== "object")
                        throw TypeError(".typingwars.Space.targets: object expected");
                    message.targets[keys[i]] = $root.typingwars.Unit.fromObject(object.targets[keys[i]]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a Space message. Also converts values to other types if specified.
         * @function toObject
         * @memberof typingwars.Space
         * @static
         * @param {typingwars.Space} message Space
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Space.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.bases = [];
                object.units = [];
            }
            if (options.objects || options.defaults)
                object.targets = {};
            if (message.bases && message.bases.length) {
                object.bases = [];
                for (var j = 0; j < message.bases.length; ++j)
                    object.bases[j] = $root.typingwars.Base.toObject(message.bases[j], options);
            }
            if (message.units && message.units.length) {
                object.units = [];
                for (var j = 0; j < message.units.length; ++j)
                    object.units[j] = $root.typingwars.Unit.toObject(message.units[j], options);
            }
            var keys2;
            if (message.targets && (keys2 = Object.keys(message.targets)).length) {
                object.targets = {};
                for (var j = 0; j < keys2.length; ++j)
                    object.targets[keys2[j]] = $root.typingwars.Unit.toObject(message.targets[keys2[j]], options);
            }
            return object;
        };

        /**
         * Converts this Space to JSON.
         * @function toJSON
         * @memberof typingwars.Space
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Space.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Space;
    })();

    typingwars.EndGame = (function() {

        /**
         * Properties of an EndGame.
         * @memberof typingwars
         * @interface IEndGame
         * @property {string|null} [message] EndGame message
         */

        /**
         * Constructs a new EndGame.
         * @memberof typingwars
         * @classdesc Represents an EndGame.
         * @implements IEndGame
         * @constructor
         * @param {typingwars.IEndGame=} [properties] Properties to set
         */
        function EndGame(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EndGame message.
         * @member {string} message
         * @memberof typingwars.EndGame
         * @instance
         */
        EndGame.prototype.message = "";

        /**
         * Creates a new EndGame instance using the specified properties.
         * @function create
         * @memberof typingwars.EndGame
         * @static
         * @param {typingwars.IEndGame=} [properties] Properties to set
         * @returns {typingwars.EndGame} EndGame instance
         */
        EndGame.create = function create(properties) {
            return new EndGame(properties);
        };

        /**
         * Encodes the specified EndGame message. Does not implicitly {@link typingwars.EndGame.verify|verify} messages.
         * @function encode
         * @memberof typingwars.EndGame
         * @static
         * @param {typingwars.IEndGame} message EndGame message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EndGame.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.message != null && message.hasOwnProperty("message"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.message);
            return writer;
        };

        /**
         * Encodes the specified EndGame message, length delimited. Does not implicitly {@link typingwars.EndGame.verify|verify} messages.
         * @function encodeDelimited
         * @memberof typingwars.EndGame
         * @static
         * @param {typingwars.IEndGame} message EndGame message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EndGame.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EndGame message from the specified reader or buffer.
         * @function decode
         * @memberof typingwars.EndGame
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {typingwars.EndGame} EndGame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EndGame.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.typingwars.EndGame();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.message = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EndGame message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof typingwars.EndGame
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {typingwars.EndGame} EndGame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EndGame.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EndGame message.
         * @function verify
         * @memberof typingwars.EndGame
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EndGame.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.message != null && message.hasOwnProperty("message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            return null;
        };

        /**
         * Creates an EndGame message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof typingwars.EndGame
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {typingwars.EndGame} EndGame
         */
        EndGame.fromObject = function fromObject(object) {
            if (object instanceof $root.typingwars.EndGame)
                return object;
            var message = new $root.typingwars.EndGame();
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from an EndGame message. Also converts values to other types if specified.
         * @function toObject
         * @memberof typingwars.EndGame
         * @static
         * @param {typingwars.EndGame} message EndGame
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EndGame.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.message = "";
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this EndGame to JSON.
         * @function toJSON
         * @memberof typingwars.EndGame
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EndGame.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EndGame;
    })();

    typingwars.UserMessage = (function() {

        /**
         * Properties of a UserMessage.
         * @memberof typingwars
         * @interface IUserMessage
         * @property {typingwars.ISpace|null} [space] UserMessage space
         * @property {typingwars.IUserAction|null} [userAction] UserMessage userAction
         * @property {typingwars.IClientError|null} [clientError] UserMessage clientError
         * @property {typingwars.ICreateRoomRequest|null} [createRoomRequest] UserMessage createRoomRequest
         * @property {typingwars.IJoinRoomRequest|null} [joinRoomRequest] UserMessage joinRoomRequest
         * @property {typingwars.IJoinRoomAck|null} [joinRoomAck] UserMessage joinRoomAck
         * @property {typingwars.IUpdateRoom|null} [updateRoom] UserMessage updateRoom
         * @property {typingwars.IUpdatePlayerReady|null} [updatePlayerReady] UserMessage updatePlayerReady
         * @property {typingwars.IStartGameRequest|null} [startGameRequest] UserMessage startGameRequest
         * @property {typingwars.IStartGameAck|null} [startGameAck] UserMessage startGameAck
         * @property {typingwars.IEndGame|null} [endGame] UserMessage endGame
         */

        /**
         * Constructs a new UserMessage.
         * @memberof typingwars
         * @classdesc Represents a UserMessage.
         * @implements IUserMessage
         * @constructor
         * @param {typingwars.IUserMessage=} [properties] Properties to set
         */
        function UserMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserMessage space.
         * @member {typingwars.ISpace|null|undefined} space
         * @memberof typingwars.UserMessage
         * @instance
         */
        UserMessage.prototype.space = null;

        /**
         * UserMessage userAction.
         * @member {typingwars.IUserAction|null|undefined} userAction
         * @memberof typingwars.UserMessage
         * @instance
         */
        UserMessage.prototype.userAction = null;

        /**
         * UserMessage clientError.
         * @member {typingwars.IClientError|null|undefined} clientError
         * @memberof typingwars.UserMessage
         * @instance
         */
        UserMessage.prototype.clientError = null;

        /**
         * UserMessage createRoomRequest.
         * @member {typingwars.ICreateRoomRequest|null|undefined} createRoomRequest
         * @memberof typingwars.UserMessage
         * @instance
         */
        UserMessage.prototype.createRoomRequest = null;

        /**
         * UserMessage joinRoomRequest.
         * @member {typingwars.IJoinRoomRequest|null|undefined} joinRoomRequest
         * @memberof typingwars.UserMessage
         * @instance
         */
        UserMessage.prototype.joinRoomRequest = null;

        /**
         * UserMessage joinRoomAck.
         * @member {typingwars.IJoinRoomAck|null|undefined} joinRoomAck
         * @memberof typingwars.UserMessage
         * @instance
         */
        UserMessage.prototype.joinRoomAck = null;

        /**
         * UserMessage updateRoom.
         * @member {typingwars.IUpdateRoom|null|undefined} updateRoom
         * @memberof typingwars.UserMessage
         * @instance
         */
        UserMessage.prototype.updateRoom = null;

        /**
         * UserMessage updatePlayerReady.
         * @member {typingwars.IUpdatePlayerReady|null|undefined} updatePlayerReady
         * @memberof typingwars.UserMessage
         * @instance
         */
        UserMessage.prototype.updatePlayerReady = null;

        /**
         * UserMessage startGameRequest.
         * @member {typingwars.IStartGameRequest|null|undefined} startGameRequest
         * @memberof typingwars.UserMessage
         * @instance
         */
        UserMessage.prototype.startGameRequest = null;

        /**
         * UserMessage startGameAck.
         * @member {typingwars.IStartGameAck|null|undefined} startGameAck
         * @memberof typingwars.UserMessage
         * @instance
         */
        UserMessage.prototype.startGameAck = null;

        /**
         * UserMessage endGame.
         * @member {typingwars.IEndGame|null|undefined} endGame
         * @memberof typingwars.UserMessage
         * @instance
         */
        UserMessage.prototype.endGame = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * UserMessage content.
         * @member {"space"|"userAction"|"clientError"|"createRoomRequest"|"joinRoomRequest"|"joinRoomAck"|"updateRoom"|"updatePlayerReady"|"startGameRequest"|"startGameAck"|"endGame"|undefined} content
         * @memberof typingwars.UserMessage
         * @instance
         */
        Object.defineProperty(UserMessage.prototype, "content", {
            get: $util.oneOfGetter($oneOfFields = ["space", "userAction", "clientError", "createRoomRequest", "joinRoomRequest", "joinRoomAck", "updateRoom", "updatePlayerReady", "startGameRequest", "startGameAck", "endGame"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new UserMessage instance using the specified properties.
         * @function create
         * @memberof typingwars.UserMessage
         * @static
         * @param {typingwars.IUserMessage=} [properties] Properties to set
         * @returns {typingwars.UserMessage} UserMessage instance
         */
        UserMessage.create = function create(properties) {
            return new UserMessage(properties);
        };

        /**
         * Encodes the specified UserMessage message. Does not implicitly {@link typingwars.UserMessage.verify|verify} messages.
         * @function encode
         * @memberof typingwars.UserMessage
         * @static
         * @param {typingwars.IUserMessage} message UserMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.space != null && message.hasOwnProperty("space"))
                $root.typingwars.Space.encode(message.space, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.userAction != null && message.hasOwnProperty("userAction"))
                $root.typingwars.UserAction.encode(message.userAction, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.clientError != null && message.hasOwnProperty("clientError"))
                $root.typingwars.ClientError.encode(message.clientError, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.createRoomRequest != null && message.hasOwnProperty("createRoomRequest"))
                $root.typingwars.CreateRoomRequest.encode(message.createRoomRequest, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.joinRoomRequest != null && message.hasOwnProperty("joinRoomRequest"))
                $root.typingwars.JoinRoomRequest.encode(message.joinRoomRequest, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.joinRoomAck != null && message.hasOwnProperty("joinRoomAck"))
                $root.typingwars.JoinRoomAck.encode(message.joinRoomAck, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.updateRoom != null && message.hasOwnProperty("updateRoom"))
                $root.typingwars.UpdateRoom.encode(message.updateRoom, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            if (message.updatePlayerReady != null && message.hasOwnProperty("updatePlayerReady"))
                $root.typingwars.UpdatePlayerReady.encode(message.updatePlayerReady, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            if (message.startGameRequest != null && message.hasOwnProperty("startGameRequest"))
                $root.typingwars.StartGameRequest.encode(message.startGameRequest, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            if (message.startGameAck != null && message.hasOwnProperty("startGameAck"))
                $root.typingwars.StartGameAck.encode(message.startGameAck, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
            if (message.endGame != null && message.hasOwnProperty("endGame"))
                $root.typingwars.EndGame.encode(message.endGame, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified UserMessage message, length delimited. Does not implicitly {@link typingwars.UserMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof typingwars.UserMessage
         * @static
         * @param {typingwars.IUserMessage} message UserMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserMessage message from the specified reader or buffer.
         * @function decode
         * @memberof typingwars.UserMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {typingwars.UserMessage} UserMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.typingwars.UserMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.space = $root.typingwars.Space.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.userAction = $root.typingwars.UserAction.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.clientError = $root.typingwars.ClientError.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.createRoomRequest = $root.typingwars.CreateRoomRequest.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.joinRoomRequest = $root.typingwars.JoinRoomRequest.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.joinRoomAck = $root.typingwars.JoinRoomAck.decode(reader, reader.uint32());
                    break;
                case 7:
                    message.updateRoom = $root.typingwars.UpdateRoom.decode(reader, reader.uint32());
                    break;
                case 8:
                    message.updatePlayerReady = $root.typingwars.UpdatePlayerReady.decode(reader, reader.uint32());
                    break;
                case 9:
                    message.startGameRequest = $root.typingwars.StartGameRequest.decode(reader, reader.uint32());
                    break;
                case 10:
                    message.startGameAck = $root.typingwars.StartGameAck.decode(reader, reader.uint32());
                    break;
                case 11:
                    message.endGame = $root.typingwars.EndGame.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof typingwars.UserMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {typingwars.UserMessage} UserMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserMessage message.
         * @function verify
         * @memberof typingwars.UserMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (message.space != null && message.hasOwnProperty("space")) {
                properties.content = 1;
                {
                    var error = $root.typingwars.Space.verify(message.space);
                    if (error)
                        return "space." + error;
                }
            }
            if (message.userAction != null && message.hasOwnProperty("userAction")) {
                if (properties.content === 1)
                    return "content: multiple values";
                properties.content = 1;
                {
                    var error = $root.typingwars.UserAction.verify(message.userAction);
                    if (error)
                        return "userAction." + error;
                }
            }
            if (message.clientError != null && message.hasOwnProperty("clientError")) {
                if (properties.content === 1)
                    return "content: multiple values";
                properties.content = 1;
                {
                    var error = $root.typingwars.ClientError.verify(message.clientError);
                    if (error)
                        return "clientError." + error;
                }
            }
            if (message.createRoomRequest != null && message.hasOwnProperty("createRoomRequest")) {
                if (properties.content === 1)
                    return "content: multiple values";
                properties.content = 1;
                {
                    var error = $root.typingwars.CreateRoomRequest.verify(message.createRoomRequest);
                    if (error)
                        return "createRoomRequest." + error;
                }
            }
            if (message.joinRoomRequest != null && message.hasOwnProperty("joinRoomRequest")) {
                if (properties.content === 1)
                    return "content: multiple values";
                properties.content = 1;
                {
                    var error = $root.typingwars.JoinRoomRequest.verify(message.joinRoomRequest);
                    if (error)
                        return "joinRoomRequest." + error;
                }
            }
            if (message.joinRoomAck != null && message.hasOwnProperty("joinRoomAck")) {
                if (properties.content === 1)
                    return "content: multiple values";
                properties.content = 1;
                {
                    var error = $root.typingwars.JoinRoomAck.verify(message.joinRoomAck);
                    if (error)
                        return "joinRoomAck." + error;
                }
            }
            if (message.updateRoom != null && message.hasOwnProperty("updateRoom")) {
                if (properties.content === 1)
                    return "content: multiple values";
                properties.content = 1;
                {
                    var error = $root.typingwars.UpdateRoom.verify(message.updateRoom);
                    if (error)
                        return "updateRoom." + error;
                }
            }
            if (message.updatePlayerReady != null && message.hasOwnProperty("updatePlayerReady")) {
                if (properties.content === 1)
                    return "content: multiple values";
                properties.content = 1;
                {
                    var error = $root.typingwars.UpdatePlayerReady.verify(message.updatePlayerReady);
                    if (error)
                        return "updatePlayerReady." + error;
                }
            }
            if (message.startGameRequest != null && message.hasOwnProperty("startGameRequest")) {
                if (properties.content === 1)
                    return "content: multiple values";
                properties.content = 1;
                {
                    var error = $root.typingwars.StartGameRequest.verify(message.startGameRequest);
                    if (error)
                        return "startGameRequest." + error;
                }
            }
            if (message.startGameAck != null && message.hasOwnProperty("startGameAck")) {
                if (properties.content === 1)
                    return "content: multiple values";
                properties.content = 1;
                {
                    var error = $root.typingwars.StartGameAck.verify(message.startGameAck);
                    if (error)
                        return "startGameAck." + error;
                }
            }
            if (message.endGame != null && message.hasOwnProperty("endGame")) {
                if (properties.content === 1)
                    return "content: multiple values";
                properties.content = 1;
                {
                    var error = $root.typingwars.EndGame.verify(message.endGame);
                    if (error)
                        return "endGame." + error;
                }
            }
            return null;
        };

        /**
         * Creates a UserMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof typingwars.UserMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {typingwars.UserMessage} UserMessage
         */
        UserMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.typingwars.UserMessage)
                return object;
            var message = new $root.typingwars.UserMessage();
            if (object.space != null) {
                if (typeof object.space !== "object")
                    throw TypeError(".typingwars.UserMessage.space: object expected");
                message.space = $root.typingwars.Space.fromObject(object.space);
            }
            if (object.userAction != null) {
                if (typeof object.userAction !== "object")
                    throw TypeError(".typingwars.UserMessage.userAction: object expected");
                message.userAction = $root.typingwars.UserAction.fromObject(object.userAction);
            }
            if (object.clientError != null) {
                if (typeof object.clientError !== "object")
                    throw TypeError(".typingwars.UserMessage.clientError: object expected");
                message.clientError = $root.typingwars.ClientError.fromObject(object.clientError);
            }
            if (object.createRoomRequest != null) {
                if (typeof object.createRoomRequest !== "object")
                    throw TypeError(".typingwars.UserMessage.createRoomRequest: object expected");
                message.createRoomRequest = $root.typingwars.CreateRoomRequest.fromObject(object.createRoomRequest);
            }
            if (object.joinRoomRequest != null) {
                if (typeof object.joinRoomRequest !== "object")
                    throw TypeError(".typingwars.UserMessage.joinRoomRequest: object expected");
                message.joinRoomRequest = $root.typingwars.JoinRoomRequest.fromObject(object.joinRoomRequest);
            }
            if (object.joinRoomAck != null) {
                if (typeof object.joinRoomAck !== "object")
                    throw TypeError(".typingwars.UserMessage.joinRoomAck: object expected");
                message.joinRoomAck = $root.typingwars.JoinRoomAck.fromObject(object.joinRoomAck);
            }
            if (object.updateRoom != null) {
                if (typeof object.updateRoom !== "object")
                    throw TypeError(".typingwars.UserMessage.updateRoom: object expected");
                message.updateRoom = $root.typingwars.UpdateRoom.fromObject(object.updateRoom);
            }
            if (object.updatePlayerReady != null) {
                if (typeof object.updatePlayerReady !== "object")
                    throw TypeError(".typingwars.UserMessage.updatePlayerReady: object expected");
                message.updatePlayerReady = $root.typingwars.UpdatePlayerReady.fromObject(object.updatePlayerReady);
            }
            if (object.startGameRequest != null) {
                if (typeof object.startGameRequest !== "object")
                    throw TypeError(".typingwars.UserMessage.startGameRequest: object expected");
                message.startGameRequest = $root.typingwars.StartGameRequest.fromObject(object.startGameRequest);
            }
            if (object.startGameAck != null) {
                if (typeof object.startGameAck !== "object")
                    throw TypeError(".typingwars.UserMessage.startGameAck: object expected");
                message.startGameAck = $root.typingwars.StartGameAck.fromObject(object.startGameAck);
            }
            if (object.endGame != null) {
                if (typeof object.endGame !== "object")
                    throw TypeError(".typingwars.UserMessage.endGame: object expected");
                message.endGame = $root.typingwars.EndGame.fromObject(object.endGame);
            }
            return message;
        };

        /**
         * Creates a plain object from a UserMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof typingwars.UserMessage
         * @static
         * @param {typingwars.UserMessage} message UserMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (message.space != null && message.hasOwnProperty("space")) {
                object.space = $root.typingwars.Space.toObject(message.space, options);
                if (options.oneofs)
                    object.content = "space";
            }
            if (message.userAction != null && message.hasOwnProperty("userAction")) {
                object.userAction = $root.typingwars.UserAction.toObject(message.userAction, options);
                if (options.oneofs)
                    object.content = "userAction";
            }
            if (message.clientError != null && message.hasOwnProperty("clientError")) {
                object.clientError = $root.typingwars.ClientError.toObject(message.clientError, options);
                if (options.oneofs)
                    object.content = "clientError";
            }
            if (message.createRoomRequest != null && message.hasOwnProperty("createRoomRequest")) {
                object.createRoomRequest = $root.typingwars.CreateRoomRequest.toObject(message.createRoomRequest, options);
                if (options.oneofs)
                    object.content = "createRoomRequest";
            }
            if (message.joinRoomRequest != null && message.hasOwnProperty("joinRoomRequest")) {
                object.joinRoomRequest = $root.typingwars.JoinRoomRequest.toObject(message.joinRoomRequest, options);
                if (options.oneofs)
                    object.content = "joinRoomRequest";
            }
            if (message.joinRoomAck != null && message.hasOwnProperty("joinRoomAck")) {
                object.joinRoomAck = $root.typingwars.JoinRoomAck.toObject(message.joinRoomAck, options);
                if (options.oneofs)
                    object.content = "joinRoomAck";
            }
            if (message.updateRoom != null && message.hasOwnProperty("updateRoom")) {
                object.updateRoom = $root.typingwars.UpdateRoom.toObject(message.updateRoom, options);
                if (options.oneofs)
                    object.content = "updateRoom";
            }
            if (message.updatePlayerReady != null && message.hasOwnProperty("updatePlayerReady")) {
                object.updatePlayerReady = $root.typingwars.UpdatePlayerReady.toObject(message.updatePlayerReady, options);
                if (options.oneofs)
                    object.content = "updatePlayerReady";
            }
            if (message.startGameRequest != null && message.hasOwnProperty("startGameRequest")) {
                object.startGameRequest = $root.typingwars.StartGameRequest.toObject(message.startGameRequest, options);
                if (options.oneofs)
                    object.content = "startGameRequest";
            }
            if (message.startGameAck != null && message.hasOwnProperty("startGameAck")) {
                object.startGameAck = $root.typingwars.StartGameAck.toObject(message.startGameAck, options);
                if (options.oneofs)
                    object.content = "startGameAck";
            }
            if (message.endGame != null && message.hasOwnProperty("endGame")) {
                object.endGame = $root.typingwars.EndGame.toObject(message.endGame, options);
                if (options.oneofs)
                    object.content = "endGame";
            }
            return object;
        };

        /**
         * Converts this UserMessage to JSON.
         * @function toJSON
         * @memberof typingwars.UserMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserMessage;
    })();

    return typingwars;
})();

module.exports = $root;
