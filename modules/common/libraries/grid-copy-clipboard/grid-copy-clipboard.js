//Enum support.
// Refer http://www.rahulsingla.com/blog/2010/02/enums-in-javascript-part-2
EnumBase = function(val, display) {
    this.getValue = function() {
        return (val);
    },

    this.toJSON = function() {
        return (val);
    },

    this.toString = function(throwIfNotFound) {
        if (!Ext.isEmpty(display)) {
            return (display);
        } else {
            var key = EnumBase.getKeyByValue(this.constructor, this.getValue());
            if (!Ext.isEmpty(key))
                return (key);
            else if (throwIfNotFound)
                throw val + ' is not a valid value.';
            else
                return (this.val);
        }
    }
}

EnumBase.getKeyByValue = function(c, val) {
    for (key in c) {
        var obj = c[key];
        if (obj instanceof c && obj.getValue() == val) {
            return (key);
        }
    }
    return (null);
}

EnumBase.parse = function(c, str) {
    var val = c[str];
    if (val != undefined) {
        return (val);
    } else {
        var key = EnumBase.getKeyByValue(c, str);
        if (!Ext.isEmpty(key))
            return (c[key]);
        else
            throw str + ' cannot be parsed.';
    }
}


SerializationMode = Ext.extend(EnumBase, {});
SerializationMode.parse = function(str) {
    return (EnumBase.parse(SerializationMode, str));
}

SerializationMode.Json = new SerializationMode(0);
SerializationMode.Csv = new SerializationMode(1);
SerializationMode.TabDelimited = new SerializationMode(2);


// ExtJs Store method to allow exporting store data to desired formats.
Ext.data.Store.prototype.serializeData = function(mode) {
    var store = this;
    var a = [];
    switch (mode) {
        case SerializationMode.Json:
            Ext.each(store.data.items, function(item) {
                a.push(item.data);
            });
            return (Ext.encode(a));
            break;

        default:
            var separator = '\t';
            if (mode == SerializationMode.Csv) {
                separator = ',';
            }
            Ext.each(store.data.items, function(item) {
                var s = '';
                item = item.data;
                for (key in item) {
                    s = s + item[key] + separator;
                }
                s = s.substr(0, s.length - 1);

                a.push(s);
            });

            return (a.join('\n'));
    }
}
