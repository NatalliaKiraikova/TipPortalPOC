module.exports = function (grunt) {
  var _ = grunt.util._,
    async = grunt.util.async,
    nuget = require("../libs/nuget")(grunt),
    path = require('path'),
    helper = require('./tip-cli-helper.js')(grunt),
    nugetConfPath = path.join(__dirname, '../', "NuGet.Config"),
    rootPath = path.resolve(), self = this,
    defaultOutputDirectory='packages',
    defaultNugetInstallOptions = {
      ConfigFile: nugetConfPath,
      OutputDirectory: defaultOutputDirectory,
      ExcludeVersion: true,
      Verbosity: 'detailed',
      NoCache: true
    },
    configDefaultFile='packages.config',
    tmpDir = 'nuget-tmp',
    distDir = 'dist',//read from options
    defaultPackageFile = 'tip.pckg.json',
    processesPackages=[];
  this.processNugetPackage = function(packageInfo,bowerConfig,params,profile,done){
    var packageName = packageInfo['name'];
    var nugetDeps = packageInfo['nuget-dependencies'] || [];
    if(packageInfo.profiles && packageInfo.profiles[profile]){
      _.extend(nugetDeps, packageInfo.profiles[profile]['nuget-dependencies'])
    }
    var nugetConfig = {packages:[]},nugetPckgFile;
    Object.keys(nugetDeps).forEach(function(key){
      //place every nuget package that would be installed into bower config
      bowerConfig.dependencies[key] =  path.join(rootPath,'packages/',key);
      nugetConfig.packages.push({
        package: {},
        attributes: {id: key, version: nugetDeps[key]}
      });
    });
    nugetPckgFile=tmpDir+'/'+packageName+'/'+configDefaultFile;
    grunt.file.mkdir(tmpDir+'/'+packageName+'/');
    grunt.file.write(nugetPckgFile,helper.toXML(nugetConfig,{header:true,attrkey:'attributes'}));
    self.installNugetPackages(nugetPckgFile,params,function(err){
      if(err){
        grunt.log.writeln("InstallNugetPackages for:"+packageName+" failed" + err);
        done('Failed to install nuget packages');
      }else{
        //final cb of nuget installation
        processesPackages.push('packages/'+packageName);
        var nestedDependencies=[];
        grunt.file.expand({ filter: 'isDirectory'},['packages/tip.*']).forEach(function(path) {
          //Add semver check there
          if(grunt.file.exists(path+"/"+defaultPackageFile) && processesPackages.indexOf(path)==-1){
            nestedDependencies.push(path+"/"+defaultPackageFile);
            //create bower json for nuget package for futher installation
            var dependencyPackageInfo = grunt.file.readJSON(path+"/"+defaultPackageFile);
            delete dependencyPackageInfo['nuget-dependencies'];
            grunt.file.write(path+"/"+'bower.json',JSON.stringify(dependencyPackageInfo,null,4));
          }
          // Remove file or folder in path
        });
        if(nestedDependencies.length){
          async.forEach(nestedDependencies,
            // 2nd param is the function that each item is passed to
            function(dependencyPackageFile, callback){
              var tipPackage = grunt.file.readJSON(dependencyPackageFile);
              self.processNugetPackage(tipPackage,bowerConfig,params,profile,callback)
            },
            // 3rd param is the function to call when everything's done
            function(err){
              // All tasks are done now
              done(err);
            }
          );
        }else{
          done();
        }
      }

    })
  };
  this.postInstallNugetPackages = function(){

  };
  this.installNugetPackages = function(nugetPckgFile,params,done){
    nuget.install(nugetPckgFile, _.extend(params, defaultNugetInstallOptions), function(err,data){
      if(err){
        done("Error trying to install"+err.toString());
      }else{
        done();
      }
    });
  };
  grunt.registerTask('tip-install', "Install Bower & Nuget ", function () {
    var taskParams = this.options(),
      taskDoneCb = this.async(),
      bowerConfig,
      args = this.args,
      profile = args[0]||'dev';

    //Clear and recreate nuget-tmp directory
    if(grunt.file.exists(tmpDir)){
      grunt.file.delete(tmpDir);
    }
    if(grunt.file.exists(defaultOutputDirectory)){
      grunt.file.delete(defaultOutputDirectory);
    }
    grunt.file.mkdir(tmpDir);
    //load root tip.pckg.json and install root nuget dependencies
    var tipRootPackage = grunt.file.readJSON(defaultPackageFile);
    //init root bower file
    bowerConfig = _.clone(tipRootPackage);
    //extend dep section
    if(tipRootPackage.profiles && tipRootPackage.profiles[profile]){
      _.extend(bowerConfig.dependencies, tipRootPackage.profiles[profile].dependencies)
    }

    delete bowerConfig['nuget-dependencies'];
    //process root nuget packaging
    self.processNugetPackage(tipRootPackage,bowerConfig,taskParams,profile,function(err){
      grunt.file.delete(tmpDir);
      if(!err){
        grunt.file.write('bower.json',JSON.stringify(bowerConfig,null,4));
        taskDoneCb();
      }else{
        grunt.fail.fatal(err);
      }

    });
  });

  grunt.registerTask('tip-nuspec', "Produce nuspec file", function () {
    var taskParams = this.options(),
      taskDoneCb = this.async(),
      nuspecConfig={
        attributes:{
          xmlns:"http://schemas.microsoft.com/packaging/2010/07/nuspec.xsd"
        },
        package:{
          metadata:{
            authors:'Deloitte',
            description:'TODO'
          }
        }
      };
    //Clear and recreate nuget-tmp directory
    if(!grunt.file.exists(distDir)){//read from options
      grunt.file.mkdir(distDir);
    }
    //load root tip.pckg.json and install root nuget dependencies
    var tipRootPackageInfo = grunt.file.readJSON(defaultPackageFile);
    //init root bower file
    nuspecConfig.package.metadata.id=tipRootPackageInfo.name;
    nuspecConfig.package.metadata.version=tipRootPackageInfo.version;
    //process root nuget packaging
    grunt.file.write(distDir+'/'+tipRootPackageInfo.name+'.nuspec',helper.toXML(nuspecConfig,{header:true,attrkey:'attributes'}));
    taskDoneCb();
  });
};
