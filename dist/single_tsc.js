"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require('typescript');
var path = require('path');
var tsc_1 = require('@angular/compiler-cli/tsc');
var fs_1 = require('fs');
var DEBUG = true;
var SOURCE_EXTENSION = /\.[jt]s$/;
function debug(msg) {
    var o = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        o[_i - 1] = arguments[_i];
    }
    if (DEBUG)
        console.log.apply(console, [msg].concat(o));
}
function formatDiagnostics(diags) {
    return diags.map(function (d) {
        var res = ts.DiagnosticCategory[d.category];
        if (d.file) {
            res += ' at ' + d.file.fileName + ':';
            var _a = d.file.getLineAndCharacterOfPosition(d.start), line = _a.line, character = _a.character;
            res += (line + 1) + ':' + (character + 1) + ':';
        }
        res += ' ' + ts.flattenDiagnosticMessageText(d.messageText, '\n');
        return res;
    })
        .join('\n');
}
exports.formatDiagnostics = formatDiagnostics;
function check(diags) {
    if (diags && diags.length && diags[0]) {
        throw new Error(formatDiagnostics(diags));
    }
}
exports.check = check;
var SingleTsc = (function (_super) {
    __extends(SingleTsc, _super);
    function SingleTsc() {
        _super.apply(this, arguments);
    }
    SingleTsc.prototype.readConfiguration = function (project, singleBasePath) {
        this.singleBasePath = singleBasePath;
        // Allow a directory containing tsconfig.json as the project value
        if (fs_1.lstatSync(project).isDirectory()) {
            project = path.join(project, "tsconfig.json");
        }
        var _a = ts.readConfigFile(project, ts.sys.readFile), config = _a.config, error = _a.error;
        tsc_1.check([error]);
        this.parsed = ts.parseJsonConfigFileContent(config, { readDirectory: ts.sys.readDirectory }, singleBasePath);
        tsc_1.check(this.parsed.errors);
        // Default codegen goes to the current directory
        // Parsed options are already converted to absolute paths
        this.ngOptions = config.angularCompilerOptions || {};
        this.ngOptions.genDir = path.join(singleBasePath, this.ngOptions.genDir || '.');
        return { parsed: this.parsed, ngOptions: this.ngOptions };
    };
    SingleTsc.prototype.recieveAndEmitSingle = function (source) {
        this.parsedSingle = ts.transpileModule(source, this.parsed.options);
        tsc_1.check(this.parsedSingle.diagnostics);
        this.ngOptions.genDir = path.join(this.singleBasePath, this.ngOptions.genDir || '.');
        return this.parsedSingle;
    };
    return SingleTsc;
}(tsc_1.Tsc));
exports.SingleTsc = SingleTsc;
exports.singleTsc = new SingleTsc();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xlX3RzYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zaW5nbGVfdHNjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQVksRUFBRSxXQUFNLFlBQVksQ0FBQyxDQUFBO0FBQ2pDLElBQVksSUFBSSxXQUFNLE1BQU0sQ0FBQyxDQUFBO0FBQzdCLG9CQUF5QiwyQkFBMkIsQ0FBQyxDQUFBO0FBQ3JELG1CQUF3QixJQUFJLENBQUMsQ0FBQTtBQUc3QixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDbkIsSUFBTSxnQkFBZ0IsR0FBRyxVQUFVLENBQUM7QUFFcEMsZUFBZSxHQUFXO0lBQUUsV0FBVztTQUFYLFdBQVcsQ0FBWCxzQkFBVyxDQUFYLElBQVc7UUFBWCwwQkFBVzs7SUFDckMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQUMsT0FBTyxDQUFDLEdBQUcsT0FBWCxPQUFPLEdBQUssR0FBRyxTQUFLLENBQUMsRUFBQyxDQUFDO0FBQ3BDLENBQUM7QUFFRCwyQkFBa0MsS0FBc0I7SUFDdEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDO1FBQ0wsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNYLEdBQUcsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1lBQ3RDLElBQUEsa0RBQXVFLEVBQWhFLGNBQUksRUFBRSx3QkFBUyxDQUFrRDtZQUN4RSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNsRCxDQUFDO1FBQ0QsR0FBRyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRSxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2IsQ0FBQyxDQUFDO1NBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xCLENBQUM7QUFaZSx5QkFBaUIsb0JBWWhDLENBQUE7QUFFRCxlQUFzQixLQUFzQjtJQUMxQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDO0FBQ0gsQ0FBQztBQUplLGFBQUssUUFJcEIsQ0FBQTtBQUVEO0lBQStCLDZCQUFHO0lBQWxDO1FBQStCLDhCQUFHO0lBc0NsQyxDQUFDO0lBaENDLHFDQUFpQixHQUFqQixVQUFrQixPQUFlLEVBQUUsY0FBc0I7UUFDdkQsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFFckMsa0VBQWtFO1FBQ2xFLEVBQUUsQ0FBQyxDQUFDLGNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDckMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFFRCxJQUFBLGdEQUFtRSxFQUE1RCxrQkFBTSxFQUFFLGdCQUFLLENBQWdEO1FBQ3BFLFdBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFZixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQywwQkFBMEIsQ0FDekMsTUFBTSxFQUNOLEVBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFDLEVBQ3JDLGNBQWMsQ0FDZixDQUFDO1FBRUYsV0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUIsZ0RBQWdEO1FBQ2hELHlEQUF5RDtRQUN6RCxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxzQkFBc0IsSUFBNEIsRUFBRSxDQUFDO1FBQzdFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ2hGLE1BQU0sQ0FBQyxFQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVELHdDQUFvQixHQUFwQixVQUFxQixNQUFjO1FBQ2xDLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwRSxXQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVwQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUM7UUFDckYsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztJQUNILGdCQUFDO0FBQUQsQ0FBQyxBQXRDRCxDQUErQixTQUFHLEdBc0NqQztBQXRDWSxpQkFBUyxZQXNDckIsQ0FBQTtBQUVVLGlCQUFTLEdBQWMsSUFBSSxTQUFTLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7VHNjLCBjaGVja30gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXItY2xpL3RzYyc7XG5pbXBvcnQge2xzdGF0U3luY30gZnJvbSAnZnMnO1xuaW1wb3J0IHtBbmd1bGFyQ29tcGlsZXJPcHRpb25zfSBmcm9tICdAYW5ndWxhci9jb21waWxlci1jbGkvY29kZWdlbic7XG5cbmNvbnN0IERFQlVHID0gdHJ1ZTtcbmNvbnN0IFNPVVJDRV9FWFRFTlNJT04gPSAvXFwuW2p0XXMkLztcblxuZnVuY3Rpb24gZGVidWcobXNnOiBzdHJpbmcsIC4uLm86IGFueVtdKSB7XG4gIGlmIChERUJVRykgY29uc29sZS5sb2cobXNnLCAuLi5vKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdERpYWdub3N0aWNzKGRpYWdzOiB0cy5EaWFnbm9zdGljW10pOiBzdHJpbmcge1xuICByZXR1cm4gZGlhZ3MubWFwKChkKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHJlcyA9IHRzLkRpYWdub3N0aWNDYXRlZ29yeVtkLmNhdGVnb3J5XTtcbiAgICAgICAgICAgICAgICBpZiAoZC5maWxlKSB7XG4gICAgICAgICAgICAgICAgICByZXMgKz0gJyBhdCAnICsgZC5maWxlLmZpbGVOYW1lICsgJzonO1xuICAgICAgICAgICAgICAgICAgY29uc3Qge2xpbmUsIGNoYXJhY3Rlcn0gPSBkLmZpbGUuZ2V0TGluZUFuZENoYXJhY3Rlck9mUG9zaXRpb24oZC5zdGFydCk7XG4gICAgICAgICAgICAgICAgICByZXMgKz0gKGxpbmUgKyAxKSArICc6JyArIChjaGFyYWN0ZXIgKyAxKSArICc6JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzICs9ICcgJyArIHRzLmZsYXR0ZW5EaWFnbm9zdGljTWVzc2FnZVRleHQoZC5tZXNzYWdlVGV4dCwgJ1xcbicpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAuam9pbignXFxuJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVjayhkaWFnczogdHMuRGlhZ25vc3RpY1tdKSB7XG4gIGlmIChkaWFncyAmJiBkaWFncy5sZW5ndGggJiYgZGlhZ3NbMF0pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoZm9ybWF0RGlhZ25vc3RpY3MoZGlhZ3MpKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgU2luZ2xlVHNjIGV4dGVuZHMgVHNjIHtcbiAgLy8gTWFrZSBzdXJlIHRoYXQgdGhpcy5yZWFkQ29uZmlndXJhdGlvbigpIGlzIHBlcmZvcm1lZCBmcm9tIG91dHNpZGVcbiAgcHVibGljIHBhcnNlZFNpbmdsZTogdHMuVHJhbnNwaWxlT3V0cHV0O1xuICBwdWJsaWMgcGFyc2VkOiB0cy5QYXJzZWRDb21tYW5kTGluZTtcbiAgcHJpdmF0ZSBzaW5nbGVCYXNlUGF0aDogc3RyaW5nO1xuXG4gIHJlYWRDb25maWd1cmF0aW9uKHByb2plY3Q6IHN0cmluZywgc2luZ2xlQmFzZVBhdGg6IHN0cmluZykge1xuICAgIHRoaXMuc2luZ2xlQmFzZVBhdGggPSBzaW5nbGVCYXNlUGF0aDtcblxuICAgIC8vIEFsbG93IGEgZGlyZWN0b3J5IGNvbnRhaW5pbmcgdHNjb25maWcuanNvbiBhcyB0aGUgcHJvamVjdCB2YWx1ZVxuICAgIGlmIChsc3RhdFN5bmMocHJvamVjdCkuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgcHJvamVjdCA9IHBhdGguam9pbihwcm9qZWN0LCBcInRzY29uZmlnLmpzb25cIik7XG4gICAgfVxuXG4gICAgY29uc3Qge2NvbmZpZywgZXJyb3J9ID0gdHMucmVhZENvbmZpZ0ZpbGUocHJvamVjdCwgdHMuc3lzLnJlYWRGaWxlKTtcbiAgICBjaGVjayhbZXJyb3JdKTtcblxuICAgIHRoaXMucGFyc2VkID0gdHMucGFyc2VKc29uQ29uZmlnRmlsZUNvbnRlbnQoXG4gICAgICBjb25maWcsIFxuICAgICAge3JlYWREaXJlY3Rvcnk6IHRzLnN5cy5yZWFkRGlyZWN0b3J5fSwgXG4gICAgICBzaW5nbGVCYXNlUGF0aFxuICAgICk7XG5cbiAgICBjaGVjayh0aGlzLnBhcnNlZC5lcnJvcnMpO1xuICAgIC8vIERlZmF1bHQgY29kZWdlbiBnb2VzIHRvIHRoZSBjdXJyZW50IGRpcmVjdG9yeVxuICAgIC8vIFBhcnNlZCBvcHRpb25zIGFyZSBhbHJlYWR5IGNvbnZlcnRlZCB0byBhYnNvbHV0ZSBwYXRoc1xuICAgIHRoaXMubmdPcHRpb25zID0gY29uZmlnLmFuZ3VsYXJDb21waWxlck9wdGlvbnMgfHwgPEFuZ3VsYXJDb21waWxlck9wdGlvbnM+e307XG4gICAgdGhpcy5uZ09wdGlvbnMuZ2VuRGlyID0gcGF0aC5qb2luKHNpbmdsZUJhc2VQYXRoLCB0aGlzLm5nT3B0aW9ucy5nZW5EaXIgfHwgJy4nKTtcbiAgICByZXR1cm4ge3BhcnNlZDogdGhpcy5wYXJzZWQsIG5nT3B0aW9uczogdGhpcy5uZ09wdGlvbnN9O1xuICB9XG5cbiAgcmVjaWV2ZUFuZEVtaXRTaW5nbGUoc291cmNlOiBzdHJpbmcpIHtcbiAgXHR0aGlzLnBhcnNlZFNpbmdsZSA9IHRzLnRyYW5zcGlsZU1vZHVsZShzb3VyY2UsIHRoaXMucGFyc2VkLm9wdGlvbnMpOyBcbiAgXHRjaGVjayh0aGlzLnBhcnNlZFNpbmdsZS5kaWFnbm9zdGljcyk7XG5cbiAgICB0aGlzLm5nT3B0aW9ucy5nZW5EaXIgPSBwYXRoLmpvaW4odGhpcy5zaW5nbGVCYXNlUGF0aCwgdGhpcy5uZ09wdGlvbnMuZ2VuRGlyIHx8ICcuJyk7XG4gICAgcmV0dXJuIHRoaXMucGFyc2VkU2luZ2xlO1xuICB9XG59XG5cbmV4cG9ydCB2YXIgc2luZ2xlVHNjOiBTaW5nbGVUc2MgPSBuZXcgU2luZ2xlVHNjKCk7Il19