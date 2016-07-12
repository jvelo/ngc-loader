"use strict";
require('ts-metadata-collector');
require('reflect-metadata');
var ts = require('ts');
var single_tsc_1 = require('./single_tsc');
var ngCompiler = require('@angular/compiler-cli/main.js');
var fs = require('fs');
var ts = require('typescript');
var path = require('path');
function ngcLoader(source, sourceMaps) {
    this.PARSED_SOURCES = ts.TranspileOutput[] = [];
    try {
        this.cacheable && this.cacheable();
        var compiler = this._compiler, compilation = this._compilation;
        var configRead = single_tsc_1.singleTsc.readConfiguration(compiler.context, compiler.context);
        single_tsc_1.check(configRead.parsed.errors);
        var parsedSource = single_tsc_1.singleTsc.recieveAndEmitSingle(source);
        single_tsc_1.check(parsedSource.diagnostics) && this.PARSED_SOURCES.push(parsedSource);
        console.log(this.PARSED_SOURCES);
        this.callback(null, parsedSource.outputText, sourceMaps);
    }
    catch (error) {
        console.error(error);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ngcLoader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdjX2xvYWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9uZ2NfbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxRQUFPLHVCQUF1QixDQUFDLENBQUE7QUFDL0IsUUFBTyxrQkFBa0IsQ0FBQyxDQUFBO0FBQzFCLElBQVksRUFBRSxXQUFNLElBQUksQ0FBQyxDQUFBO0FBR3pCLDJCQUErQixjQUFjLENBQUMsQ0FBQTtBQUU5QyxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsK0JBQStCLENBQUMsQ0FBQztBQUMxRCxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdkIsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQy9CLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUczQixtQkFBbUIsTUFBTSxFQUFFLFVBQVU7SUFDbkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ2hELElBQUksQ0FBQztRQUNILElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ25DLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQ3pCLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBRXBDLElBQUksVUFBVSxHQUFHLHNCQUFTLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakYsa0JBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRWhDLElBQUksWUFBWSxHQUFHLHNCQUFTLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUQsa0JBQUssQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFMUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMzRCxDQUFFO0lBQUEsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkIsQ0FBQztBQUNILENBQUM7QUFFRDtrQkFBZSxTQUFTLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3RzLW1ldGFkYXRhLWNvbGxlY3Rvcic7XG5pbXBvcnQgJ3JlZmxlY3QtbWV0YWRhdGEnO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHMnO1xuaW1wb3J0IHtsc3RhdFN5bmN9IGZyb20gJ2ZzJztcbmltcG9ydCB7Q29kZUdlbmVyYXRvciwgTWV0YWRhdGFXcml0ZXJIb3N0LCBOb2RlUmVmbGVjdG9ySG9zdCwgVHNpY2tsZUhvc3R9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyLWNsaSc7XG5pbXBvcnQge3NpbmdsZVRzYywgY2hlY2t9IGZyb20gJy4vc2luZ2xlX3RzYyc7XG5cbnZhciBuZ0NvbXBpbGVyID0gcmVxdWlyZSgnQGFuZ3VsYXIvY29tcGlsZXItY2xpL21haW4uanMnKTtcbnZhciBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG52YXIgdHMgPSByZXF1aXJlKCd0eXBlc2NyaXB0Jyk7XG52YXIgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcblxuXG5mdW5jdGlvbiBuZ2NMb2FkZXIoc291cmNlLCBzb3VyY2VNYXBzKSB7XG4gIHRoaXMuUEFSU0VEX1NPVVJDRVMgPSB0cy5UcmFuc3BpbGVPdXRwdXRbXSA9IFtdO1xuICB0cnkge1xuICAgIHRoaXMuY2FjaGVhYmxlICYmIHRoaXMuY2FjaGVhYmxlKCk7XG4gICAgdmFyIGNvbXBpbGVyID0gdGhpcy5fY29tcGlsZXIsXG4gICAgICAgIGNvbXBpbGF0aW9uID0gdGhpcy5fY29tcGlsYXRpb247XG4gICAgXG4gICAgbGV0IGNvbmZpZ1JlYWQgPSBzaW5nbGVUc2MucmVhZENvbmZpZ3VyYXRpb24oY29tcGlsZXIuY29udGV4dCwgY29tcGlsZXIuY29udGV4dCk7XG4gICAgY2hlY2soY29uZmlnUmVhZC5wYXJzZWQuZXJyb3JzKTtcbiAgICBcbiAgICBsZXQgcGFyc2VkU291cmNlID0gc2luZ2xlVHNjLnJlY2lldmVBbmRFbWl0U2luZ2xlKHNvdXJjZSk7XG4gICAgY2hlY2socGFyc2VkU291cmNlLmRpYWdub3N0aWNzKSAmJiB0aGlzLlBBUlNFRF9TT1VSQ0VTLnB1c2gocGFyc2VkU291cmNlKTtcblxuICAgIGNvbnNvbGUubG9nKHRoaXMuUEFSU0VEX1NPVVJDRVMpO1xuXG4gICAgdGhpcy5jYWxsYmFjayhudWxsLCBwYXJzZWRTb3VyY2Uub3V0cHV0VGV4dCwgc291cmNlTWFwcyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmdjTG9hZGVyOyAiXX0=